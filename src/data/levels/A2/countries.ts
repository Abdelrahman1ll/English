export interface CountryItem {
  country: string;
  nationality: string;
  arabicCountry: string;
  arabicNationality: string;
  flag?: string; // Emoji flags
}

export const COUNTRIES_DATA: CountryItem[] = [
  { country: "Portugal", nationality: "Portuguese", arabicCountry: "البرتغال", arabicNationality: "برتغالي", flag: "🇵🇹" },
  { country: "Spain", nationality: "Spanish", arabicCountry: "إسبانيا", arabicNationality: "إسباني", flag: "🇪🇸" },
  { country: "Saudi Arabia", nationality: "Saudi", arabicCountry: "المملكة العربية السعودية", arabicNationality: "سعودي", flag: "🇸🇦" },
  { country: "Canada", nationality: "Canadian", arabicCountry: "كندا", arabicNationality: "كندي", flag: "🇨🇦" },
  { country: "Chile", nationality: "Chilean", arabicCountry: "تشيلي", arabicNationality: "تشيلي", flag: "🇨🇱" },
  { country: "Mexico", nationality: "Mexican", arabicCountry: "المكسيك", arabicNationality: "مكسيكي", flag: "🇲🇽" },
  { country: "USA (The United States)", nationality: "American", arabicCountry: "الولايات المتحدة الأمريكية", arabicNationality: "أمريكي", flag: "🇺🇸" },
  { country: "UK (The United Kingdom)", nationality: "British", arabicCountry: "المملكة المتحدة", arabicNationality: "بريطاني", flag: "🇬🇧" },
  { country: "England", nationality: "English", arabicCountry: "إنجلترا", arabicNationality: "إنجليزي", flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿" },
  { country: "Japan", nationality: "Japanese", arabicCountry: "اليابان", arabicNationality: "ياباني", flag: "🇯🇵" },
  { country: "Korea", nationality: "Korean", arabicCountry: "كوريا", arabicNationality: "كوري", flag: "🇰🇷" },
  { country: "China", nationality: "Chinese", arabicCountry: "الصين", arabicNationality: "صيني", flag: "🇨🇳" },
  { country: "Vietnam", nationality: "Vietnamese", arabicCountry: "فيتنام", arabicNationality: "فيتنامي", flag: "🇻🇳" },
  { country: "Egypt", nationality: "Egyptian", arabicCountry: "مصر", arabicNationality: "مصري", flag: "🇪🇬" },
  { country: "France", nationality: "French", arabicCountry: "فرنسا", arabicNationality: "فرنسي", flag: "🇫🇷" },
];
