export type PreparePaymentRequest = {
  planType: 'premium' | 'basic' | string;
  amount: number;
  goodsName: string;
};

export type PreparePaymentResponse = {
  success: boolean;
  message?: string;
  data: {
    clientId: string;
    orderId: string;
    amount: number;
    goodsName: string;
    returnUrl: string;
    timestamp: string;
    signature: string;
    buyerName?: string;
    buyerEmail?: string;
    buyerTel?: string;
  };
};

export async function preparePayment(token: string, body: PreparePaymentRequest) {
  const res = await fetch('/api/payment/prepare', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(body),
  });
  return res.json() as Promise<PreparePaymentResponse>;
}

export type ApprovePaymentRequest = {
  tid: string;
  orderId: string;
  amount: number;
};

export type ApprovePaymentResponse = {
  success: boolean;
  message?: string;
  data: {
    payment: {
      amount: number;
      cardName?: string;
      receiptUrl?: string;
    };
  };
};

export async function approvePayment(token: string, body: ApprovePaymentRequest) {
  const res = await fetch('/api/payment/approve', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(body),
  });
  return res.json() as Promise<ApprovePaymentResponse>;
}

// 결제 내역 조회
export type PaymentHistoryResponse = {
  success: boolean;
  data: Array<{
    id: string;
    order_id: string;
    amount: number;
    plan_type: string;
    goods_name: string;
    status: string;
    pay_method: string;
    card_name?: string;
    card_number?: string;
    receipt_url?: string;
    approved_at: string;
    created_at: string;
  }>;
  pagination: {
    total: number;
    limit: number;
    offset: number;
  };
};

export async function getPaymentHistory(
  token: string,
  limit: number = 10,
  offset: number = 0
): Promise<PaymentHistoryResponse> {
  const res = await fetch(`/api/payment/history?limit=${limit}&offset=${offset}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.json() as Promise<PaymentHistoryResponse>;
}

// 구독 정보 조회
export type SubscriptionResponse = {
  success: boolean;
  data: {
    id: string;
    user_id: string;
    plan_type: string;
    start_date: string;
    end_date: string;
    status: string;
    amount: number;
    order_id: string;
    receipt_url?: string;
    created_at: string;
  } | null;
  message?: string;
};

export async function getSubscription(token: string): Promise<SubscriptionResponse> {
  const res = await fetch('/api/payment/subscription', {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.json() as Promise<SubscriptionResponse>;
}

// 결제 취소
export type CancelPaymentRequest = {
  orderId: string;
  reason?: string;
};

export type CancelPaymentResponse = {
  success: boolean;
  message?: string;
  data: {
    tid: string;
    cancelledAmount: number;
    cancelledAt: string;
  };
};

export async function cancelPayment(token: string, body: CancelPaymentRequest): Promise<CancelPaymentResponse> {
  const res = await fetch('/api/payment/cancel', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(body),
  });
  return res.json() as Promise<CancelPaymentResponse>;
}


