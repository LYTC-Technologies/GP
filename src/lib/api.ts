import { Product, Order, SpecialRequestCategory, SpecialRequest, StayInfo, GuestSession } from "../types";

const API_BASE_URL = "https://lytc-hotel-backend.onrender.com";

// Static database elements mimicking backend data
const products: Product[] = [
  // Restaurant
  {
    id: "r1",
    category: "restaurant",
    name: "شريحة ريب آي مع الكمأة السوداء",
    description: "شريحة لحم ريب آي فاخرة مطهوة بامتياز، تقدم مع صلصة الكمأة السوداء النادرة والبطاطس المهروسة المخملية والبروكلي المشوي.",
    price: 380,
    image: "https://images.pexels.com/photos/675951/pexels-photo-675951.jpeg?auto=compress&cs=tinysrgb&w=1200"
  },
  {
    id: "r2",
    category: "restaurant",
    name: "سلمون بري بصلصة الليمون والشبت",
    description: "سلمون بري طازج مشوي بامتياز، يقدم مع هليون مطهو على البخار وصلصة الكافيار الخفيفة بالليمون والكرز المكرمل.",
    price: 290,
    image: "https://images.pexels.com/photos/46239/salmon-dish-food-meal-46239.jpeg?auto=compress&cs=tinysrgb&w=1200"
  },
  {
    id: "r3",
    category: "restaurant",
    name: "تاغليوليني الكمأة السوداء الطازجة",
    description: "باستا تاغليوليني مخملية محضرة يدوياً، مع زبدة بارميزان معتقة وشرائح سخية من الكمأة السوداء الطازجة والزعتر البري.",
    price: 240,
    image: "https://images.pexels.com/photos/1437267/pexels-photo-1437267.jpeg?auto=compress&cs=tinysrgb&w=1200"
  },
  {
    id: "r4",
    category: "restaurant",
    name: "مختارات الكافيار الملكي المتميز",
    description: "ثلاثون غراماً من كافيار أوسيترا الفاخر، يقدم مع خبز بليني الدافئ المحضر من دقيق الحنطة السوداء وكريمة الحامض الكلاسيكية والليمون.",
    price: 950,
    image: "https://images.pexels.com/photos/262959/pexels-photo-262959.jpeg?auto=compress&cs=tinysrgb&w=1200"
  },

  // Drinks
  {
    id: "d1",
    category: "drinks",
    name: "كولد برو فيلا مسك الخاص",
    description: "قهوة مقطرة ببطء لمدة ٢٤ ساعة من حبوب البن الإثيوبية الفاخرة أحادية المصدر، تمتاز بإيحاءات الفواكه والياسمين العطرة.",
    price: 65,
    image: "https://images.pexels.com/photos/2615323/pexels-photo-2615323.jpeg?auto=compress&cs=tinysrgb&w=1200"
  },
  {
    id: "d2",
    category: "drinks",
    name: "لاتيه الزعفران الذهبي الفاخر",
    description: "إسبريسو غني مع حليب مخملي دافئ منقوع بأرقى خيوط الزعفران الإيراني الحر ولمسة خفيفة من عسل الجبل الصافي ورقائق الذهب.",
    price: 85,
    image: "https://images.pexels.com/photos/312418/pexels-photo-312418.jpeg?auto=compress&cs=tinysrgb&w=1200"
  },
  {
    id: "d3",
    category: "drinks",
    name: "موجيتو الحمضيات والعنبر الفاخر",
    description: "مزيج منعش من عصائر الحمضيات الطازجة، شراب العنبر الطبيعي المقطر يدوياً، أوراق النعناع الطازجة وماء التونيك الفوار الساخن.",
    price: 75,
    image: "https://images.pexels.com/photos/1189257/pexels-photo-1189257.jpeg?auto=compress&cs=tinysrgb&w=1200"
  },
  {
    id: "d4",
    category: "drinks",
    name: "إسبريسو أوبسيديان النقي",
    description: "جرعة إسبريسو مزدوجة مركزة ومحضرة من حبوب بن جبلية نادرة بنكهة الشوكولاتة الداكنة الكولومبية والقوام الكامل الرائع.",
    price: 45,
    image: "https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg?auto=compress&cs=tinysrgb&w=1200"
  },

  // Room Service
  {
    id: "s1",
    category: "room_service",
    name: "الفطور الملكي المتكامل",
    description: "تشكيلة فاخرة من الفطائر الساخنة والمربيات الطبيعية والبيض العضوي المطهو حسب اختيارك والأجبان الفاخرة وسلة المخبوزات وعصير البرتقال الطازج.",
    price: 180,
    image: "https://images.pexels.com/photos/103124/pexels-photo-103124.jpeg?auto=compress&cs=tinysrgb&w=1200"
  },
  {
    id: "s2",
    category: "room_service",
    name: "مختارات الحلويات الفرنسية الراقية",
    description: "تشكيلة يومية من الماكرون الفاخر، وتارت التوت البري، ومعجنات الكرواسون بالزبدة والشكولاته البلجيكية مع شاي إيرل غراي الفاخر.",
    price: 140,
    image: "https://images.pexels.com/photos/808941/pexels-photo-808941.jpeg?auto=compress&cs=tinysrgb&w=1200"
  },
  {
    id: "s3",
    category: "room_service",
    name: "لوحة الأجبان الفاخرة المنسقة",
    description: "أجبان أوروبية معتقة ممتازة، تقدم مع العسل البري النقي، المكسرات المحمصة بعناية، ثمار التين الطازجة وخبز الأرتيزان الساخن.",
    price: 160,
    image: "https://images.pexels.com/photos/291528/pexels-photo-291528.jpeg?auto=compress&cs=tinysrgb&w=1200"
  },
  {
    id: "s4",
    category: "room_service",
    name: "طبق الفواكه الاستوائية الطازجة",
    description: "شرائح منسقة بعناية من المانجو الطازج، البابايا، ثمرة التنين الاستوائية، والتوت البري مع شراب النعناع المنعش.",
    price: 110,
    image: "https://images.pexels.com/photos/1132047/pexels-photo-1132047.jpeg?auto=compress&cs=tinysrgb&w=1200"
  }
];

const specialRequestCategories: SpecialRequestCategory[] = [
  { id: "housekeeping", name: "تنظيف وترتيب الجناح", description: "طلب ترتيب الغرفة، المناشف الإضافية، أو مستلزمات العناية الشخصية" },
  { id: "luggage", name: "نقل ومساعدة الأمتعة", description: "مساعدة في نقل الحقائب والأمتعة الشخصية عند المغادرة أو الوصول" },
  { id: "pillow_menu", name: "قائمة الوسائد الخاصة", description: "اختر نوع الوسائد المفضل لديك لراحة مثالية أثناء النوم" },
  { id: "valet", name: "تجهيز وجلب السيارة", description: "اطلب تجهيز سيارتك الخاصة من خدمة إيقاف السيارات لتكون جاهزة أمام المدخل" },
  { id: "airport", name: "تنسيق الاستقبال والتوصيل للمطار", description: "حجز سيارة ليموزين خاصة للتنقل الفاخر وتسهيل السفر" }
];

// Helper to validate room numbers
function isValidRoom(room: string): boolean {
  const cleanRoom = room.trim().replace(/[٠-٩]/g, (d) => String.fromCharCode(d.charCodeAt(0) - 1632));
  if (!cleanRoom) return false;
  const num = parseInt(cleanRoom, 10);
  return !isNaN(num) && num >= 100 && num <= 999;
}

// Local storage helper for special requests
function getLocalRequests(): SpecialRequest[] {
  const data = localStorage.getItem("vms_special_requests_db");
  return data ? JSON.parse(data) : [];
}

function saveLocalRequests(requests: SpecialRequest[]) {
  localStorage.setItem("vms_special_requests_db", JSON.stringify(requests));
}

export const apiService = {
  // Login with Room Number
  async login(roomNumber: string): Promise<GuestSession> {
    await new Promise((resolve) => setTimeout(resolve, 400));
    if (!roomNumber || !isValidRoom(roomNumber)) {
      throw new Error("رقم الغرفة غير صحيح. يرجى إدخال رقم غرفة صالح بين 100 و 999.");
    }

    const now = new Date();
    const checkInDate = now.toLocaleDateString("ar-SA", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit"
    });

    const checkOutDate = new Date(now);
    checkOutDate.setDate(checkOutDate.getDate() + 7);
    const checkOutDateStr = checkOutDate.toLocaleDateString("ar-SA", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit"
    });

    return {
      roomNumber,
      guestName: "صاحب السمو والضيف الكريم",
      stayInfo: {
        villaName: `جناح فيلا مسك ${roomNumber}`,
        checkIn: checkInDate,
        checkOut: checkOutDateStr,
        butlerName: "ميخائيل",
        conciergeNumber: "+٩٦٦ ٥٠ ٠٠٠ ٠٠٠٠",
        capacity: "شخصين بالغين",
      }
    };
  },

  // Get Stay Details
  async getStayDetails(roomNumber: string): Promise<{
    roomCharge: number;
    totalCharge: number;
    checkInTime: string;
    expectedCheckOutDate: string;
    checkOutTime: string | null;
    status: string;
    notes: string | null;
  }> {
    const url = new URL(`${API_BASE_URL}/api/guest/stay-details`);
    url.searchParams.append("roomNumber", roomNumber);

    try {
      const response = await fetch(url.toString(), {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      if (!response.ok) {
        console.error("Failed to fetch stay details, status:", response.status);
        return {
          roomCharge: 0,
          totalCharge: 0,
          checkInTime: "٢٠٢٦/٠٧/١٨",
          expectedCheckOutDate: "٢٠٢٦/٠٧/٢٥",
          checkOutTime: null,
          status: "ACTIVE",
          notes: null,
        };
      }

      const data = await response.json();

      return {
        roomCharge: data.roomCharge || 0,
        totalCharge: data.totalCharge || 0,
        checkInTime: data.checkInTime || "",
        expectedCheckOutDate: data.expectedCheckOutDate || "",
        checkOutTime: data.checkOutTime || null,
        status: data.status || "UNKNOWN",
        notes: data.notes || null,
      };
    } catch (error) {
      console.error("Error fetching stay details:", error);
      return {
        roomCharge: 0,
        totalCharge: 0,
        checkInTime: "٢٠٢٦/٠٧/١٨",
        expectedCheckOutDate: "٢٠٢٦/٠٧/٢٥",
        checkOutTime: null,
        status: "ACTIVE",
        notes: null,
      };
    }
  },

  // Get Special Request Categories
  async getSpecialRequestCategories(): Promise<SpecialRequestCategory[]> {
    await new Promise((resolve) => setTimeout(resolve, 200));
    return [];
  },

  // Submit Special Request (local storage)
  async submitSpecialRequest(
    roomNumber: string,
    categoryId: string,
    notes: string
  ): Promise<{ success: boolean; request: SpecialRequest }> {
    await new Promise((resolve) => setTimeout(resolve, 500));
    if (!roomNumber || !isValidRoom(roomNumber)) {
      throw new Error("رقم الغرفة غير صحيح");
    }
    const category = specialRequestCategories.find((c) => c.id === categoryId);
    if (!category) {
      throw new Error("التصنيف المطلوب غير موجود");
    }

    const newRequest: SpecialRequest = {
      id: `REQ-${Math.floor(1000 + Math.random() * 9000)}`,
      roomNumber,
      category: category.name,
      notes: notes || "لا توجد ملاحظات إضافية",
      createdAt: new Date().toLocaleTimeString("ar-SA", { hour: "2-digit", minute: "2-digit" }),
    };

    const requests = getLocalRequests();
    requests.push(newRequest);
    saveLocalRequests(requests);

    return { success: true, request: newRequest };
  },

  // Get Room's Special Requests from API: GET /api/guest/stays/special-orders?roomNumber=xxx
  async getSpecialRequests(roomNumber: string): Promise<SpecialRequest[]> {
    const url = new URL(`${API_BASE_URL}/api/guest/stays/special-orders`);
    url.searchParams.append("roomNumber", roomNumber);

    try {
      const response = await fetch(url.toString(), {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      if (!response.ok) {
        console.error("Failed to fetch special requests, status:", response.status);
        return [];
      }

      const data = await response.json();

      // Map API SpecialOrderResponse to local SpecialRequest type
      return (data || []).map((item: any) => ({
        id: String(item.id),
        roomNumber: roomNumber,
        category: item.specialOffer?.title || "طلب خاص",
        notes: item.specialOffer?.description || "",
        createdAt: item.createdAt || "",
      }));
    } catch (error) {
      console.error("Error fetching special requests:", error);
      return [];
    }
  },

  // Get Special Offers from API: GET /api/guest/special-offers?pageable=...
  async getOffers(): Promise<{ id: number; title: string; description: string }[]> {
    const url = new URL(`${API_BASE_URL}/api/guest/special-offers`);
    url.searchParams.append("page", "0");
    url.searchParams.append("size", "10");

    try {
      const response = await fetch(url.toString(), {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      if (!response.ok) {
        console.error("Failed to fetch special offers, status:", response.status);
        return [];
      }

      const data = await response.json();
      return data.content || [];
    } catch (error) {
      console.error("Error fetching special offers:", error);
      return [];
    }
  },

  // Get Menu Items from API: GET /api/guest/menu?category=xxx&pageable=...
  async getMenu(category?: string): Promise<{ id: number; name: string; price: number; category: string }[]> {
    const url = new URL(`${API_BASE_URL}/api/guest/menu`);
    url.searchParams.append("page", "0");
    url.searchParams.append("size", "100");
    if (category) {
      url.searchParams.append("category", category);
    }

    try {
      const response = await fetch(url.toString(), {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      if (!response.ok) {
        console.error("Failed to fetch menu items, status:", response.status);
        return [];
      }

      const data = await response.json();
      return data.content || [];
    } catch (error) {
      console.error("Error fetching menu items:", error);
      return [];
    }
  },

  // Get Special Orders from API: GET /api/guest/stays/special-orders?roomNumber=xxx
  async getSpecialOrders(roomNumber: string): Promise<{
    id: number;
    specialOffer: { id: number; title: string; description: string };
    agreedPrice: number;
    createdAt: string;
  }[]> {
    const url = new URL(`${API_BASE_URL}/api/guest/stays/special-orders`);
    url.searchParams.append("roomNumber", roomNumber);

    try {
      const response = await fetch(url.toString(), {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      if (!response.ok) {
        console.error("Failed to fetch special orders, status:", response.status);
        return [];
      }

      const data = await response.json();
      return data || [];
    } catch (error) {
      console.error("Error fetching special orders:", error);
      return [];
    }
  },

  // Get Orders from API: GET /api/guest/orders?roomNumber=xxx&pageable=...
  // API returns PageOrderResponse with OrderResponse objects
  async getOrders(roomNumber: string): Promise<Order[]> {
    const url = new URL(`${API_BASE_URL}/api/guest/orders`);
    url.searchParams.append("roomNumber", roomNumber);
    url.searchParams.append("page", "0");
    url.searchParams.append("size", "100");

    try {
      const response = await fetch(url.toString(), {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      if (!response.ok) {
        console.error("Failed to fetch orders, status:", response.status);
        return [];
      }

      const data = await response.json();
      const orders = data.content || [];

      // Map API OrderResponse to local Order type
      return orders.map((apiOrder: any) => ({
        id: String(apiOrder.orderId),
        roomNumber: apiOrder.roomNumber || roomNumber,
        items: (apiOrder.items || []).map((item: any) => ({
          productId: String(item.menuItemId),
          name: item.itemName || "",
          quantity: item.quantity || 0,
          price: parseFloat(item.unitPrice) || 0,
        })),
        total: parseFloat(apiOrder.totalAmount) || 0,
        status: apiOrder.status || "قيد الانتظار",
        createdAt: apiOrder.createdAt || "",
      }));
    } catch (error) {
      console.error("Error fetching orders:", error);
      return [];
    }
  },

  // Create Order: POST /api/guest/orders?roomNumber=xxx
  async createOrder(
    roomNumber: string,
    category: "FOOD" | "DRINK" | "SERVICE",
    items: { menuItemId: number; quantity: number; notes?: string }[]
  ): Promise<{ success: boolean; orderId: number }> {
    const url = new URL(`${API_BASE_URL}/api/guest/orders`);
    url.searchParams.append("roomNumber", roomNumber);

    try {
      const response = await fetch(url.toString(), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ category, items }),
      });

      if (!response.ok) {
        console.error("Failed to create order, status:", response.status);
        return { success: false, orderId: 0 };
      }

      const data = await response.json();
      return { success: true, orderId: data.orderId || data.id };
    } catch (error) {
      console.error("Error creating order:", error);
      return { success: false, orderId: 0 };
    }
  },

  // Cancel Order: POST /api/guest/orders/{orderId}/cancel?roomNumber=xxx
  async cancelOrder(orderId: string, roomNumber?: string): Promise<{ success: boolean }> {
    const url = new URL(`${API_BASE_URL}/api/guest/orders/${orderId}/cancel`);
    if (roomNumber) {
      url.searchParams.append("roomNumber", roomNumber);
    }

    try {
      const response = await fetch(url.toString(), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });

      if (!response.ok) {
        console.error("Failed to cancel order, status:", response.status);
        throw new Error("فشل إلغاء الطلب");
      }

      return { success: true };
    } catch (error) {
      console.error("Error cancelling order:", error);
      throw error;
    }
  },

  // Submit Stay Rating: PUT /api/guest/stay/rating?roomNumber=xxx
  async submitRating(roomNumber: string, stars: number, notes: string): Promise<{ success: boolean }> {
    const url = new URL(`${API_BASE_URL}/api/guest/stay/rating`);
    url.searchParams.append("roomNumber", roomNumber);

    try {
      const response = await fetch(url.toString(), {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          stars,
          notes: notes || "",
        }),
      });

      if (!response.ok) {
        console.error("Failed to submit rating, status:", response.status);
        throw new Error("فشل إرسال التقييم");
      }

      return { success: true };
    } catch (error) {
      console.error("Error submitting rating:", error);
      throw error;
    }
  },

  // Checkout: PUT /api/guest/stays/checkout?roomNumber=xxx
  async checkout(roomNumber: string): Promise<{ success: boolean; checkOutTime: string }> {
    const url = new URL(`${API_BASE_URL}/api/guest/stays/checkout`);
    url.searchParams.append("roomNumber", roomNumber);

    try {
      const response = await fetch(url.toString(), {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
      });

      if (!response.ok) {
        console.error("Failed to checkout, status:", response.status);
        return { success: true, checkOutTime: new Date().toISOString() };
      }

      const data = await response.json();
      return { success: true, checkOutTime: data.checkOutTime || new Date().toISOString() };
    } catch (error) {
      console.error("Error during checkout:", error);
      return { success: true, checkOutTime: new Date().toISOString() };
    }
  },
};
