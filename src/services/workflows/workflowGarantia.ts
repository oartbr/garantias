// workflowGarantia.ts
export interface StatusWorkflows {
  [status: string]: {
    [role: string]: {
      message: string;
      route: string;
      action: string;
    };
  };
}

const workflows: StatusWorkflows = {
  created: {
    ADMIN: {
      message: "assignSKUtoGarantia",
      route: "admin-panel/garantias/assign/{garantiaId}",
      action: "assign",
    },
    QA: {
      message: "assignSKUtoGarantia",
      route: "admin-panel/garantias/check/{garantiaId}",
      action: "assign",
    },
    USER: {
      message: "accessDenied",
      route: "/scan",
      action: "support",
    },
    default: {
      message: "accessDenied",
      route: "{garantiaId}/check-phone-number",
      action: "login",
    },
  },
  assigned: {
    ADMIN: {
      message: "checkItemQuality",
      route: "admin-panel/garantias/check/{garantiaId}",
      action: "qualityCheck",
    },
    QA: {
      message: "checkItemQuality",
      route: "admin-panel/garantias/check/{garantiaId}",
      action: "qualityCheck",
    },
    USER: {
      message: "accessDenied",
      route: "/check-phone-number",
      action: "support",
    },
    default: {
      message: "accessDenied",
      route: "check-phone-number",
      action: "login",
    },
  },
  shipped: {
    ADMIN: {
      message: "itemShipped",
      route: "admin-panel/garantias/edit/{garantiaId}",
      action: "edit",
    },
    CARRIER: {
      message: "confirmDelivery",
      route: "/{garantiaId}/deliver",
      action: "deliver",
    },
    USER: {
      message: "registerGarantia",
      route: "/{garantiaId}/check-phone-number",
      action: "register",
    },
    QA: {
      message: "checkItemQuality",
      route: "admin-panel/garantias/check/{garantiaId}",
      action: "qualityCheck",
    },
    default: {
      message: "registerGarantia",
      route: "/{garantiaId}/check-phone-number",
      action: "login",
    },
  },
  qualityChecked: {
    ADMIN: {
      message: "availableForSale",
      route: "admin-panel/garantias/check/{garantiaId}",
      action: "edit",
    },
    CARRIER: {
      message: "availableForSale",
      route: "/{garantiaId}/deliver",
      action: "deliver",
    },
    QA: {
      message: "checkItemQuality",
      route: "admin-panel/garantias/check/{garantiaId}",
      action: "qualityCheck",
    },
    USER: {
      message: "registerGarantia",
      route: "/{garantiaId}/check-phone-number",
      action: "register",
    },
    default: {
      message: "registerGarantia",
      route: "/{garantiaId}/check-phone-number",
      action: "login",
    },
  },
  delivered: {
    ADMIN: {
      message: "itemDelivered",
      route: "admin-panel/garantias/edit/{garantiaId}",
      action: "edit",
    },
    CARRIER: {
      message: "itemDelivered",
      route: "/CARRIER/delivered/{garantiaId}",
      action: "correct",
    },
    USER: {
      message: "registerGarantia",
      route: "/{garantiaId}/check-phone-number",
      action: "register",
    },
    QA: {
      message: "itemDelivered",
      route: "{garantiaId}",
      action: "review",
    },
    default: {
      message: "registerGarantia",
      route: "/{garantiaId}/check-phone-number",
      action: "login",
    },
  },
  void: {
    ADMIN: {
      message: "voidGarantia",
      route: "admin-panel/garantias/edit/{garantiaId}",
      action: "edit",
    },
    QA: {
      message: "itemDelivered",
      route: "{garantiaId}",
      action: "review",
    },
    default: {
      message: "registerGarantia",
      route: "/{garantiaId}/check-phone-number",
      action: "login",
    },
  },
  registered: {
    ADMIN: {
      message: "registeredToClient",
      route: "admin-panel/garantias/edit/{garantiaId}",
      action: "edit",
    },
    USER: {
      message: "alreadyRegistered",
      route: "/{garantiaId}/check-phone-number",
      action: "open",
    },
    QA: {
      message: "registeredToClient",
      route: "{garantiaId}",
      action: "review",
    },
    default: {
      message: "registerGarantia",
      route: "/{garantiaId}/check-phone-number",
      action: "login",
    },
  },
};

export default workflows;
