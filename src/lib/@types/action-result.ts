export interface ActionResult<T> {
  success: boolean;
  data?: T; 
  errors?: string[];
}

export function createActionResult<T>(params: {
  success: boolean;
  data?: T; 
  errors?: string[];
}): ActionResult<T> {
  return params;
}
