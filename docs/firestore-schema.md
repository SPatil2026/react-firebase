# Firebase Firestore Schema Documentation

## Collections Structure

### users
Collection to store user-specific data
```javascript
users/{userId}/
{
  email: string,
  addresses: [
    {
      id: string,
      address: string,
      isDefault: boolean,
      label: string // "Home", "Work", etc.
    }
  ],
  cart: {
    [pizzaId: number]: number // pizzaId: quantity
  }
}
```

### orders
Collection to store order history
```javascript
orders/{orderId}/
{
  userId: string,
  items: [
    {
      pizzaId: number,
      quantity: number,
      priceAtTime: number
    }
  ],
  deliveryAddress: {
    id: string,
    address: string,
    label: string
  },
  status: string, // "pending", "confirmed", "delivered"
  totalAmount: number,
  createdAt: timestamp,
  updatedAt: timestamp
}
```

### pizzas
Collection to store pizza menu items
```javascript
pizzas/{pizzaId}/
{
  name: string,
  price: number,
  category: string,
  description: string,
  image: string,
  isAvailable: boolean
}
```

# Firestore Collections Structure

## Collection Diagram
```
firebase-root/
│
├── users/
│   └── {userId}/
│       ├── email: string
│       ├── cart: {
│       │   pizzaId: quantity
│       │ }
│       └── addresses: [
│           {
│             id: string,
│             address: string,
│             label: string,
│             isDefault: boolean
│           }
│         ]
│
├── orders/
│   └── {orderId}/
│       ├── userId: string
│       ├── items: [
│       │   {
│       │     pizzaId: number,
│       │     quantity: number,
│       │     priceAtTime: number
│       │   }
│       │ ]
│       ├── deliveryAddress: {
│       │   id: string,
│       │   address: string,
│       │   label: string
│       │ }
│       ├── status: string
│       ├── totalAmount: number
│       ├── createdAt: timestamp
│       └── updatedAt: timestamp
│
└── pizzas/
    └── {pizzaId}/
        ├── name: string
        ├── price: number
        ├── category: string
        ├── description: string
        ├── image: string
        └── isAvailable: boolean

```

## Example Documents

### User Document Example
```json
{
  "users/abc123": {
    "email": "user@example.com",
    "cart": {
      "1": 2,
      "3": 1
    },
    "addresses": [
      {
        "id": "addr1",
        "address": "123 Main St, City",
        "label": "Home",
        "isDefault": true
      },
      {
        "id": "addr2",
        "address": "456 Work Ave, City",
        "label": "Office",
        "isDefault": false
      }
    ]
  }
}
```

### Order Document Example
```json
{
  "orders/xyz789": {
    "userId": "abc123",
    "items": [
      {
        "pizzaId": 1,
        "quantity": 2,
        "priceAtTime": 12.99
      },
      {
        "pizzaId": 3,
        "quantity": 1,
        "priceAtTime": 14.99
      }
    ],
    "deliveryAddress": {
      "id": "addr1",
      "address": "123 Main St, City",
      "label": "Home"
    },
    "status": "pending",
    "totalAmount": 40.97,
    "createdAt": "2024-01-20T10:30:00Z",
    "updatedAt": "2024-01-20T10:30:00Z"
  }
}
```

### Pizza Document Example
```json
{
  "pizzas/1": {
    "name": "Margherita",
    "price": 12.99,
    "category": "vegetarian",
    "description": "Fresh mozzarella, tomatoes, basil",
    "image": "https://example.com/margherita.jpg",
    "isAvailable": true
  }
}
```

## Setup Steps

1. Create the collections in Firebase Console:
   - Go to Firestore Database
   - Click "Start Collection"
   - Create the three main collections: `users`, `orders`, `pizzas`

2. Security Rules Template:
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    match /orders/{orderId} {
      allow read: if request.auth != null && resource.data.userId == request.auth.uid;
      allow create: if request.auth != null;
      allow update: if request.auth != null && resource.data.userId == request.auth.uid;
    }
    match /pizzas/{pizzaId} {
      allow read: if true;
      allow write: if false; // Only admin can modify menu
    }
  }
}
```
