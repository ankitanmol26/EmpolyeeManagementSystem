function Input({

label,

type="text",

placeholder,

value,

onChange

}){

return(

<div className="flex flex-col gap-2">

<label

className="font-medium text-gray-700"

>

{label}

</label>

<input

type={type}

placeholder={placeholder}

value={value}

onChange={onChange}

className="

px-4

py-3

rounded-xl

border

border-gray-300

outline-none

focus:ring-4

focus:ring-indigo-200

focus:border-indigo-500

transition

"

/>

</div>

);

}

export default Input;