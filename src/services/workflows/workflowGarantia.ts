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
    default: {
      message: "accessDenied",
      route: "/scan",
      action: "support",
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
    default: {
      message: "accessDenied",
      route: "/scan",
      action: "support",
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
    default: {
      message: "registerGarantia",
      route: "/{garantiaId}/check-phone-number",
      action: "register",
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
    default: {
      message: "registerGarantia",
      route: "/{garantiaId}/check-phone-number",
      action: "register",
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
    default: {
      message: "registerGarantia",
      route: "/{garantiaId}/check-phone-number",
      action: "register",
    },
  },
  void: {
    ADMIN: {
      message: "voidGarantia",
      route: "admin-panel/garantias/edit/{garantiaId}",
      action: "edit",
    },
    default: {
      message: "voidGarantia",
      route: "/scan",
      action: "close",
    },
  },
  registered: {
    ADMIN: {
      message: "registeredToClient",
      route: "admin-panel/garantias/edit/{garantiaId}",
      action: "edit",
    },
    default: {
      message: "alreadyRegistered",
      route: "/{garantiaId}/check-phone-number",
      action: "open",
    },
  },
};

export default workflows;
