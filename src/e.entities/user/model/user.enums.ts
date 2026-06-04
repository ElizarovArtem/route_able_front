export enum ActivityLevel {
  SEDENTARY = 'sedentary', // минимум активности
  LIGHT = 'light', // 1–3 тренировки в неделю
  MODERATE = 'moderate', // 3–5
  ACTIVE = 'active', // 6–7
  VERY_ACTIVE = 'very_active', // 2-разовые тренировки, тяжёлый физ. труд
}

export enum WeightGoal {
  LOSE = 'LOSE',
  MAINTAIN = 'MAINTAIN',
  GAIN = 'GAIN',
}

export enum Gender {
  Male = 'male',
  Female = 'female',
}

export enum Roles {
  Admin = 'Admin',
  Coach = 'Coach',
  Client = 'Client',
}

export enum CoachVerificationStatus {
  PENDING = 'pending',
  APPROVED = 'approved',
  REJECTED = 'rejected',
}

export enum ReviewDecision {
  'approve' = 'approve',
  'reject' = 'reject',
}

export enum CoachOrClientTabsKeys {
  chat = 'chat',
  workoutsPlan = 'workoutsPlan',
  mealPlan = 'mealPlan',
  videoChat = 'videoChat',
  reviews = 'reviews',
  servicesAndSlots = 'servicesAndSlots',
}

export enum LkContentTypeTabKeys {
  user = 'user',
  coach = 'coach',
  admin = 'admin',
}
