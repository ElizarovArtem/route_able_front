import {
  PaidFeature,
  SubscriptionPeriod,
  SubscriptionPlanCode,
  SubscriptionStatus,
} from '@/e.entities/subscriptions/model/subscriptions.constants.ts';

export type PaidPlan = {
  code: SubscriptionPlanCode;
  title: string;
  description: string;
  priceMonth: number | null;
  priceYear: number | null;
  discount: number;
  benefits: string[];
};

export type FeatureConfig = {
  enabled: boolean;
  monthlyLimit: number;
};

export type SubscriptionFeatures = Partial<Record<PaidFeature, FeatureConfig>>;

export type MySubscriptionPlan = {
  id: string;
  code: SubscriptionPlanCode;
  name: string;
  description: string | null;
  price: string;
  currency: string;
  period: SubscriptionPeriod;
  features: SubscriptionFeatures;
  isActive: boolean;
  sortOrder: number;
  createdAt: string;
  updatedAt: string;
};

export type MyUserSubscription = {
  id: string;
  userId: string;
  planId: string;
  status: SubscriptionStatus;
  startAt: string | null;
  endAt: string | null;
  trialEndsAt: string | null;
  cancelAtPeriodEnd: boolean;
  canceledAt: string | null;
  externalCustomerId: string | null;
  externalSubscriptionId: string | null;
  createdAt: string;
  updatedAt: string;
};

export type FeatureUsageItem = {
  id: string;
  userId: string;
  feature: PaidFeature;
  periodStart: string;
  periodEnd: string;
  used: number;
  limit: number;
  createdAt: string;
  updatedAt: string;
};

export type GetMySubscriptionResponse = {
  subscription: MyUserSubscription | null;
  plan: MySubscriptionPlan | null;
  features: SubscriptionFeatures;
  usage: FeatureUsageItem[];
};
