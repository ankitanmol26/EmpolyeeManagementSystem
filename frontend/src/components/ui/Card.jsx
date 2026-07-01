import { motion } from "framer-motion";

function Card({

children,

className=""

}){

return(

<motion.div

whileHover={{

y:-5

}}

transition={{

duration:.25

}}

className={`

bg-white

rounded-2xl

shadow-md

p-6

${className}

`}

>

{children}

</motion.div>

);

}

export default Card;