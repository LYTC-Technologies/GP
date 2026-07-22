import { Product, Order, SpecialRequestCategory, SpecialRequest, StayInfo, GuestSession } from "../types";

const API_BASE_URL = "https://lytc-hotel-backend.onrender.com";

// Static database elements mimicking backend data
const products: Product[] = [
  // Restaurant (المطعم)
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

  // Drinks (المشروبات)
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

  // Room Service (خدمة الغرف)
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

const offers = [
  {
    id: "o1",
    name: "تجربة اليخت الخاص عند الغروب",
    description: "رحلة بحرية مخصصة مدتها ثلاث ساعات على متن يخت فيلا مسك الفاخر مع طاهٍ خاص لتقديم عشاء بحري متكامل."
  },
  {
    id: "o2",
    name: "جلسة الاسترخاء وتجديد الحيوية بالذهب",
    description: "علاج متكامل مخصص لشخصين في السبا الفاخر باستخدام زيوت عطرية نادرة ومستخلصات الذهب عيار ٢٤ قيراط."
  },
  {
    id: "o3",
    name: "رحلة الهليكوبتر وجولة سماء المدينة",
    description: "جولة سماوية ساحرة فوق المعالم التاريخية والساحل تنطلق مباشرة من مهبط طائرات الهليكوبتر الخاص بالمنتجع."
  }
];

// Helper to validate room numbers
function isValidRoom(room: string): boolean {
  const cleanRoom = room.trim().replace(/[٠-٩]/g, (d) => String.fromCharCode(d.charCodeAt(0) - 1632));
  if (!cleanRoom) return false;
  const num = parseInt(cleanRoom, 10);
  return !isNaN(num) && num >= 100 && num <= 999;
}

// Local storage helper databases
function getLocalOrders(): Order[] {
  const data = localStorage.getItem("vms_orders_db");
  return data ? JSON.parse(data) : [];
}

function saveLocalOrders(orders: Order[]) {
  localStorage.setItem("vms_orders_db", JSON.stringify(orders));
}

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
    return {
      roomNumber,
      guestName: "صاحب السمو والضيف الكريم",
      stayInfo: {
        villaName: `جناح فيلا مسك ${roomNumber}`,
        checkIn: "٢٠٢٦/٠٧/١٨",
        checkOut: "٢٠٢٦/٠٧/٢٥",
        butlerName: "ميخائيل",
        conciergeNumber: "+٩٦٦ ٥٠ ٠٠٠ ٠٠٠٠",
        capacity: "شخصين بالغين",
      }
    };
  },

  // Get Stay Information
  async getStayInfo(roomNumber: string): Promise<StayInfo> {
    await new Promise((resolve) => setTimeout(resolve, 200));
    if (!roomNumber || !isValidRoom(roomNumber)) {
      throw new Error("الرجاء تسجيل الدخول أولاً");
    }
    return {
      villaName: `جناح فيلا مسك ${roomNumber}`,
      checkIn: "٢٠٢٦/٠٧/١٨",
      checkOut: "٢٠٢٦/٠٧/٢٥",
      butlerName: "ميخائيل",
      conciergeNumber: "+٩٦٦ ٥٠ ٠٠٠ ٠٠٠٠",
      capacity: "شخصين بالغين",
    };
  },

  // Get Stay Details (including payment information)
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

    console.log("Fetching stay details for room:", roomNumber);
    console.log("URL:", url.toString());

    try {
      const response = await fetch(url.toString(), {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      console.log("Response status:", response.status);

      if (!response.ok) {
        console.error("Failed to fetch stay details, status:", response.status);
        throw new Error("Failed to fetch stay details");
      }

      const data = await response.json();
      console.log("Stay details data:", data);

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
      throw error;
    }
  },


  // Get Special Request Categories
  async getSpecialRequestCategories(): Promise<SpecialRequestCategory[]> {
    await new Promise((resolve) => setTimeout(resolve, 200));
    return [];
  },

  // Submit Special Request
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

  // Get Room's Special Requests
  async getSpecialRequests(roomNumber: string): Promise<SpecialRequest[]> {
    await new Promise((resolve) => setTimeout(resolve, 200));
    const requests = getLocalRequests();
    return requests.filter((r) => r.roomNumber === roomNumber);
  },

  // Get Special Offers
  async getOffers(): Promise<{ id: number; title: string; description: string }[]> {
    const url = new URL(`${API_BASE_URL}/api/guest/special-offers`);
    url.searchParams.append("page", "0");
    url.searchParams.append("size", "10");

    const response = await fetch(url.toString(), {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch special offers");
    }

    const data = await response.json();
    return data.content || [];
  },

  // Get Menu Items
  async getMenu(category?: string): Promise<{ id: number; name: string; price: number; category: string }[]> {
    const url = new URL(`${API_BASE_URL}/api/guest/menu`);
    url.searchParams.append("page", "0");
    url.searchParams.append("size", "100");
    if (category) {
      url.searchParams.append("category", category);
    }

    const response = await fetch(url.toString(), {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch menu items");
    }

    const data = await response.json();
    return data.content || [];
  },

  // Get Special Orders
  async getSpecialOrders(roomNumber: string): Promise<{
    id: number;
    specialOffer: { id: number; title: string; description: string };
    agreedPrice: number;
    createdAt: string;
  }[]> {
    const url = new URL(`${API_BASE_URL}/api/guest/stays/special-orders`);
    url.searchParams.append("roomNumber", roomNumber);

    const response = await fetch(url.toString(), {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch special orders");
    }

    const data = await response.json();
    return data || [];
  },

  // Get Room's Orders
  async getOrders(roomNumber: string): Promise<Order[]> {
    await new Promise((resolve) => setTimeout(resolve, 200));
    const orders = getLocalOrders();
    return orders.filter((o) => o.roomNumber === roomNumber);
  },

  // Create Order
  async createOrder(
    roomNumber: string,
    category: "FOOD" | "DRINK" | "SERVICE",
    items: { menuItemId: number; quantity: number; notes?: string }[]
  ): Promise<{ success: boolean; orderId: number }> {
    const url = new URL(`${API_BASE_URL}/api/guest/orders`);
    url.searchParams.append("roomNumber", roomNumber);

    const response = await fetch(url.toString(), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        category,
        items,
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to create order");
    }

    const data = await response.json();
    return { success: true, orderId: data.id };
  },

  // Cancel Order
  async cancelOrder(orderId: string): Promise<{ success: boolean; order: Order }> {
    await new Promise((resolve) => setTimeout(resolve, 400));
    const orders = getLocalOrders();
    const index = orders.findIndex((o) => o.id === orderId);
    if (index === -1) {
      throw new Error("الطلب غير موجود");
    }
    if (orders[index].status !== "قيد الانتظار") {
      throw new Error("لا يمكن إلغاء الطلب بعد البدء في تحضيره");
    }
    orders[index].status = "ملغي";
    saveLocalOrders(orders);
    return { success: true, order: orders[index] };
  },

  // Delete/Dismiss Order
  async deleteOrder(orderId: string): Promise<{ success: boolean }> {
    await new Promise((resolve) => setTimeout(resolve, 300));
    const orders = getLocalOrders();
    const index = orders.findIndex((o) => o.id === orderId);
    if (index === -1) {
      throw new Error("الطلب غير موجود");
    }
    orders.splice(index, 1);
    saveLocalOrders(orders);
    return { success: true };
  },

  // Submit Stay Rating
  async submitRating(roomNumber: string, stars: number, notes: string): Promise<{ success: boolean }> {
    const url = new URL(`${API_BASE_URL}/api/guest/stay/rating`);
    url.searchParams.append("roomNumber", roomNumber);

    const response = await fetch(url.toString(), {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        stars,
        notes: notes || "",
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to submit rating");
    }

    return { success: true };
  },
};
