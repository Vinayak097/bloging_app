import { Quote } from "../components/Quote"
import { Auth } from "../components/Auth"
export function  Signin(){
    return (
        <div className="grid grid-cols-1 lg:grid-cols-2">
            <div className="">
                <Auth labeltype="signin"></Auth>
                
            </div>
            <div className="hidded lg:block">
                <Quote></Quote>

            </div>
        </div>
    )
}