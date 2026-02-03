
export interface NewsItem {
  id: string;
  title: string;
  category: string;
  date: string;
  summary: string;
  image: string;
}

export interface Leader {
  id: string;
  name: string;
  role: string;
  bio: string;
  image: string;
}

export interface ManifestoPoint {
  title: string;
  description: string;
  icon: string;
}

export interface ContactForm {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface MembershipForm {
  name: string;
  phone: string;
  email: string;
  district: string;
  profession: string;
}
