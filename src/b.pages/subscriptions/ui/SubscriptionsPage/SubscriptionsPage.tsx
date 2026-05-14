import React, { useState } from 'react';

import { SubscriptionModal } from '@/d.features/subscriptions/ui';
import { SubscriptionCard } from '@/e.entities/subscriptions';
import { useGetPaidPlans } from '@/e.entities/subscriptions/api/queries/useGetPaidPlans.ts';
import type { PaidPlan } from '@/e.entities/subscriptions/model/subscriptions.types.ts';
import { UiFlex, UiTypography } from '@/f.shared/ui';

export const SubscriptionsPage = () => {
  const [selectedPlan, setSelectedPlan] = useState<PaidPlan | null>(null);

  const { data } = useGetPaidPlans();

  return (
    <UiFlex direction="column" gap="l">
      <UiTypography bold size="xl">
        Тарифы и подписки
      </UiTypography>

      <UiFlex childrenEqualLength>
        {data?.map((plan) => (
          <SubscriptionCard
            key={plan.code}
            code={plan.code}
            title={plan.title}
            description={plan.description}
            priceMonth={plan.priceMonth}
            benefits={plan.benefits}
            discount={plan.discount}
            onPayClick={() => setSelectedPlan(plan)}
            priceYear={plan.priceYear}
          />
        ))}
      </UiFlex>

      <SubscriptionModal
        selectedPlan={selectedPlan}
        onCancel={() => setSelectedPlan(null)}
        onClose={() => setSelectedPlan(null)}
      />
    </UiFlex>
  );
};
