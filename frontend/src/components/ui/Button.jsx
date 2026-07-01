import { motion } from "framer-motion";

function Button({

children,

onClick,

type="button",

className=""

}){

return(

<motion.button

whileHover={{scale:1.03}}

whileTap={{scale:.97}}

transition={{duration:.2}}

type={type}

onClick={onClick}

className={

`px-5 py-3

rounded-xl

bg-indigo-600

text-white

font-semibold

shadow-lg

hover:bg-indigo-700

transition-all

${className}`

}

>

{children}

</motion.button>

);

}

export default Button;