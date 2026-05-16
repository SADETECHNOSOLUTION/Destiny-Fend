
import React from "react";

const Advertisement = ()=>{

    const stringValue = "12345678901234567890"; // Example of a large number
const longValue = BigInt(stringValue);
console.log((typeof longValue)); // 12345678901234567890n

    return(
        <div className='w-full rounded-md'>
{longValue}
        </div>
        
    )
}

export default Advertisement;