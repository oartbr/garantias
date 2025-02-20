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
      message: "ADMIN: Garantia {garantiaId} needs to be assigned",
      route: "admin-panel/garantias/edit/{garantiaId}",
      action: "edit",
    },
    FACTORY: {
      message: "Factory: Garantia {garantiaId} needs to be assigned",
      route: "/{garantiaId}/assign",
      action: "Assign",
    },
    default: {
      message: "USER: Access denied for garantia {garantiaId}",
      route: "/error",
      action: "support",
    },
  },
  assigned: {
    ADMIN: {
      message: "ADMIN: Garantia {garantiaId} was assigned",
      route: "admin-panel/garantias/edit/{garantiaId}",
      action: "edit",
    },
    FACTORY: {
      message: "ADMIN: Garantia {garantiaId} was assigned",
      route: "/{garantiaId}/assign",
      action: "reassign",
    },
    default: {
      message: "Garantia {garantiaId} is assigned",
      route: "/{garantiaId}/check-phone-number",
      action: "register",
    },
  },
  shipped: {
    ADMIN: {
      message: "ADMIN: Garantia {garantiaId} was shipped",
      route: "admin-panel/garantias/edit/{garantiaId}",
      action: "edit",
    },
    CARRIER: {
      message: "FACTORY: Garantia {garantiaId} was shipped",
      route: "/{garantiaId}/deliver",
      action: "deliver",
    },
    default: {
      message: "Garantia {garantiaId} was shipped",
      route: "/{garantiaId}/check-phone-number",
      action: "register",
    },
  },
  delivered: {
    ADMIN: {
      message: "ADMIN: Garantia {garantiaId} was delivered",
      route: "admin-panel/garantias/edit/{garantiaId}",
      action: "edit",
    },
    CARRIER: {
      message: "CARRIER: Garantia {garantiaId} was delivered",
      route: "/CARRIER/delivered/{garantiaId}",
      action: "correct",
    },
    default: {
      message: "Garantia {garantiaId} is delivered",
      route: "/{garantiaId}/check-phone-number",
      action: "register",
    },
  },
  void: {
    ADMIN: {
      message: "ADMIN: Garantia {garantiaId} was void",
      route: "admin-panel/garantias/edit/{garantiaId}",
      action: "edit",
    },
    default: {
      message: "Garantia {garantiaId} is void",
      route: "/error",
      action: "close",
    },
  },
  registered: {
    ADMIN: {
      message: "ADMIN: Garantia {garantiaId} was registered",
      route: "admin-panel/garantias/edit/{garantiaId}",
      action: "edit",
    },
    default: {
      message: "Garantia {garantiaId} is already registered",
      route: "/{garantiaId}/check-phone-number",
      action: "open",
    },
  },
};

export default workflows;
