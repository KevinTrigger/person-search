import { useState } from "react";

export const withErrorApi = View => {
  return props => {
    const [errorApi, setErrorApi] = useState(false);
    
    return (
      <>
        {
          errorApi ? 
          <ErrorRequest /> 
          : 
          <View setErrorApi={setErrorApi} {...props} />
        }
      </>
    )    
  }
}