export interface Product {
  id: string;
  category: "restaurant" | "drinks" | "room_service";
  name: string;
  description: string;
  price: number;
  image: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface OrderItem {
  productId: string;
  name: string;
  quantity: number;
  price: number;
}

export interface Order {
  id: string;
  roomNumber: string;
  items: OrderItem[];
  total: number;
  status: "قيد الانتظار" | "جاري التحضير" | "جاري التوصيل" | "تم التوصيل" | "ملغي";
  createdAt: string;
}

export interface SpecialRequestCategory {
  id: string;
  name: string;
  description: string;
}

export interface SpecialRequest {
  id: string;
  roomNumber: string;
  category: string;
  notes: string;
  createdAt: string;
}

export interface StayInfo {
  villaName: string;
  checkIn: string;
  checkOut: string;
  butlerName: string;
  conciergeNumber: string;
  capacity: string;
}

export interface GuestSession {
  roomNumber: string;
  guestName: string;
  stayInfo: StayInfo;
}
