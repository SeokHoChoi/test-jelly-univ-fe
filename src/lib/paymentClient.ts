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


