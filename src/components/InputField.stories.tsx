
import type { Meta, StoryObj } from "@storybook/react-vite";
import InputField from "./inputfield";
import { useState } from "react";



const  meta :Meta<typeof InputField> ={
    title:"component/inputfield",
    component:InputField,
    tags:["autodocs"]
}
export default meta;

type Story =StoryObj<typeof InputField>;
// default input field
export const Default:Story={
render:()=>{
    const [value,setValue] =useState("");
    return (
        <div className="p-4">
         <InputField label="Email"
         placeholder="enter name"
         value={value}
         onChange={(e)=>setValue(e.target.value)}
         helperText="we never share your email"></InputField>
        </div>
    )
}
};
// invalid input field (error message)
export const Invalid :Story={
    render:()=>{
        const [value,setValue] =useState("wrong email")
        return (
            <div className="p-4">
                <InputField label="email"
                placeholder="enter valid email"
                value={value}
                onChange={(e)=>setValue(e.target.value)}
                invalid
                helperText="invalid email address">

                </InputField>
            </div>
        )
    }
};
// disabled inputfield
export const Disabled:Story={
    render:()=>(
        <div className="p-4">
            <InputField
            label="username"
            placeholder="disabled input"
            value="jjjj"
            disabled
            helperText="this filed is diabled"></InputField>
        </div>
    )
}

// password field with toggle 

export const Password:Story={
    render:()=>{
         const [Password,setPassword] =useState("")
         return (
        <div className="p-4">
       
       <InputField
       label="username"
       placeholder="password"
       type="password"
       value={Password}
       onChange={(e)=>setPassword(e.target.value)}
       helperText="use at least 8 character"
       ></InputField>
        </div>
         )
    }
}
//inputfield with clear button
export const  withClearButton:Story={
    render:()=>{
        const [text,setText] = useState("clear me")
        return(
            <div className="p-4">
                <InputField label="search"
                placeholder="type something ..."
                value={text}
                onChange={(e)=>setText(e.target.value)}
                clearable
                ></InputField>
            </div>
        )

    }
}