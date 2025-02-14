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
      action: "Edit",
    },
    FACTORY: {
      message: "Factory: Garantia {garantiaId} needs to be assigned",
      route: "/{garantiaId}/assign",
      action: "Assign",
    },
    default: {
      message: "USER: Access denied for garantia {garantiaId}",
      route: "/error",
      action: "Contact support",
    },
  },
  assigned: {
    ADMIN: {
      message: "ADMIN: Garantia {garantiaId} was assigned",
      route: "admin-panel/garantias/edit/{garantiaId}",
      action: "Edit",
    },
    FACTORY: {
      message: "ADMIN: Garantia {garantiaId} was assigned",
      route: "/{garantiaId}/assign",
      action: "Reassign",
    },
    default: {
      message: "Garantia {garantiaId} is assigned",
      route: "/{garantiaId}/check-phone-number",
      action: "Register",
    },
  },
  shipped: {
    ADMIN: {
      message: "ADMIN: Garantia {garantiaId} was shipped",
      route: "admin-panel/garantias/edit/{garantiaId}",
      action: "Edit",
    },
    CARRIER: {
      message: "FACTORY: Garantia {garantiaId} was shipped",
      route: "/{garantiaId}/deliver",
      action: "Deliver",
    },
    default: {
      message: "Garantia {garantiaId} was shipped",
      route: "/{garantiaId}/check-phone-number",
      action: "Register",
    },
  },
  delivered: {
    ADMIN: {
      message: "ADMIN: Garantia {garantiaId} was delivered",
      route: "admin-panel/garantias/edit/{garantiaId}",
      action: "Edit",
    },
    CARRIER: {
      message: "CARRIER: Garantia {garantiaId} was delivered",
      route: "/CARRIER/delivered/{garantiaId}",
      action: "Correct",
    },
    default: {
      message: "Garantia {garantiaId} is delivered",
      route: "/{garantiaId}/check-phone-number",
      action: "Register",
    },
  },
  void: {
    ADMIN: {
      message: "ADMIN: Garantia {garantiaId} was void",
      route: "admin-panel/garantias/edit/{garantiaId}",
      action: "Edit",
    },
    default: {
      message: "Garantia {garantiaId} is void",
      route: "/error",
      action: "Close",
    },
  },
  registered: {
    ADMIN: {
      message: "ADMIN: Garantia {garantiaId} was registered",
      route: "admin-panel/garantias/edit/{garantiaId}",
      action: "Edit",
    },
    default: {
      message: "Garantia {garantiaId} is already registered",
      route: "/{garantiaId}/check-phone-number",
      action: "Open",
    },
  },
};

export default workflows;
