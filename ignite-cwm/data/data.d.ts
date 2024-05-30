import {climbingGrades} from "./dropDownPickerOptions"

export interface ClimbingStyle {
    style: "sport" | "bouldering" | "trad" | "top rope"
    maxGrade: typeof climbingGrades.bouldering 
    indoorOnly: boolean
    isPreferred: boolean
    yearsExp: number
}