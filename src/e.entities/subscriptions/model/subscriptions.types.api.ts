import type {
  SubscriptionPaymentProvider,
  SubscriptionPaymentStatus,
  SubscriptionPeriod,
  SubscriptionPlanCode,
  SubscriptionStatus,
} from '@/e.entities/subscriptions/model/subscriptions.constants.ts';
import type {
  FeatureUsageItem,
  MySubscriptionPlan,
  MyUserSubscription,
  SubscriptionFeatures,
} from '@/e.entities/subscriptions/model/subscriptions.types.ts';

export type GetMySubscriptionResponse = {
  subscription: MyUserSubscription | null;
  plan: MySubscriptionPlan | null;
  features: SubscriptionFeatures;
  usage: FeatureUsageItem[];
};

export type GetSubscriptionPaymentStatusResponse = {
  paymentId: string;
  subscriptionId: string | null;
  paymentStatus: SubscriptionPaymentStatus;
  subscriptionStatus: SubscriptionStatus | null;
  provider: SubscriptionPaymentProvider;
  paidAt: string | null;
  startAt: string | null;
  endAt: string | null;
  planCode: SubscriptionPlanCode | null;
  period: SubscriptionPeriod | null;
};

export type CreateSubscriptionCheckoutRequest = {
  planCode: SubscriptionPlanCode;
  period: SubscriptionPeriod;
};

export type CreateSubscriptionCheckoutResponse = {
  subscriptionId: string;
  paymentId: string;
  status: SubscriptionStatus;
  paymentStatus: SubscriptionPaymentStatus;
  provider: SubscriptionPaymentProvider;
  paymentUrl: string | null;
};

export type CancelSubscriptionRequest = {
  reason?: string;
};

export type CancelSubscriptionResponse = {
  subscriptionId: string;
  status: SubscriptionStatus;
  cancelAtPeriodEnd: boolean;
  canceledAt: string;
  reason: string | null;
};

export type ChangeSubscriptionPlanRequest = {
  planCode: SubscriptionPlanCode;
  period?: SubscriptionPeriod;
};

export type ChangeSubscriptionPlanResponse = CreateSubscriptionCheckoutResponse;

export type ActivateStubSubscriptionRequest = {
  subscriptionId?: string;
  paymentId?: string;
};

export type ActivateStubSubscriptionResponse = {
  subscriptionId: string;
  paymentId: string;
  status: SubscriptionStatus;
  paymentStatus: SubscriptionPaymentStatus;
  startAt: string;
  endAt: string;
};
