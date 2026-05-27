// Bảng màu chính của Bếp của Luật
export const COLORS = {
  cream: "#FAF4F1",
  beige: "#F3EAE4",
  pinkNude: "#D5B4A4",
  borderBeige: "#D9C9BF",
  borderLight: "#E9DFDA",
  caramel: "#B89777",
  textDark: "#664226",
  accent: "#9F6C3E",
};

export const MEAL_TYPES = [
  { value: "sang", label: "Bữa sáng", emoji: "🌅" },
  { value: "trua", label: "Bữa trưa", emoji: "☀️" },
  { value: "toi", label: "Bữa tối", emoji: "🌙" },
  { value: "an_nhe", label: "Ăn nhẹ", emoji: "🍪" },
];

export const MEAL_TYPE_LABEL: Record<string, string> = {
  sang: "Bữa sáng",
  trua: "Bữa trưa",
  toi: "Bữa tối",
  an_nhe: "Ăn nhẹ",
};

export const DIFFICULTY_OPTIONS = [
  { value: "de", label: "Dễ" },
  { value: "trung_binh", label: "Trung bình" },
  { value: "kho", label: "Khó" },
];

export const DIFFICULTY_LABEL: Record<string, string> = {
  de: "Dễ",
  trung_binh: "Trung bình",
  kho: "Khó",
};

export const RECIPE_TAGS = [
  "healthy",
  "giảm cân",
  "tăng cơ",
  "món chay",
  "ít calo",
  "nhanh gọn",
  "gia đình",
  "meal prep",
];

export const GROCERY_CATEGORIES = [
  { value: "rau_cu", label: "Rau củ", emoji: "🥬" },
  { value: "trai_cay", label: "Trái cây", emoji: "🍎" },
  { value: "thit_ca_trung", label: "Thịt / cá / trứng", emoji: "🍳" },
  { value: "sua_dam", label: "Sữa / đạm", emoji: "🥛" },
  { value: "ngu_coc", label: "Ngũ cốc / tinh bột", emoji: "🌾" },
  { value: "gia_vi", label: "Gia vị", emoji: "🧂" },
  { value: "khac", label: "Khác", emoji: "🛒" },
];

export const GROCERY_CATEGORY_LABEL: Record<string, string> = {
  rau_cu: "Rau củ",
  trai_cay: "Trái cây",
  thit_ca_trung: "Thịt / cá / trứng",
  sua_dam: "Sữa / đạm",
  ngu_coc: "Ngũ cốc / tinh bột",
  gia_vi: "Gia vị",
  khac: "Khác",
};

export const DAYS_OF_WEEK = [
  { value: 1, label: "Thứ 2", short: "T2" },
  { value: 2, label: "Thứ 3", short: "T3" },
  { value: 3, label: "Thứ 4", short: "T4" },
  { value: 4, label: "Thứ 5", short: "T5" },
  { value: 5, label: "Thứ 6", short: "T6" },
  { value: 6, label: "Thứ 7", short: "T7" },
  { value: 7, label: "Chủ nhật", short: "CN" },
];
