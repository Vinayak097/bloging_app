import { Quote } from "../components/Quote"
import { Auth } from "../components/Auth"
export function  Signup(){
    return (
        <div className="grid grid-cols-1 lg:grid-cols-2">
            <div className="">
                <Auth labeltype="signup"></Auth>                
            </div>
            <div className="hidden lg:block">
                <Quote></Quote>
            </div>
        
        </div> 
    )
}