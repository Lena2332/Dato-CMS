import {Image} from "react-datocms";
import {StepI} from "@/models/Step";

interface StepProps {
    step: StepI
}
export default function Step({ step }: StepProps) {
    return (

           <div>
               <h3>{step.title}</h3>
               <Image data={step.photo.responsiveImage}/>
               <div>
                   {step.descr}
               </div>
           </div>
    )
}