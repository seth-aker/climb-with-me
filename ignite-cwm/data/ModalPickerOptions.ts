

export interface Option {
    label: string,
    value: string
}


export const genderOptions: Option[] = [
    {label: "Male", value: "m" },
    {label: "Female", value: "f"},
    {label: "Non-binary", value: "n"},
    {label: "Prefer not to say", value: "d"}
]
const bouldering: Option[] = [
        {label: "V0", value: "v0"},
        {label: "V1", value: "v1"},
        {label: "V2", value: "v2"},
        {label: "V3", value: "v3"},
        {label: "V4", value: "v4"},
        {label: "V5", value: "v5"},
        {label: "V6", value: "v6"},
        {label: "V7", value: "v7"},
        {label: "V8", value: "v8"},
        {label: "V9", value: "v9"},
        {label: "V10", value: "v10"},
        {label: "V11", value: "v11"},
        {label: "V12", value: "v12"},
        {label: "V13", value: "v13"},
        {label: "V14", value: "v14"},
        {label: "V15", value: "v15"},
        {label: "V16", value: "v16"},
        {label: "V17", value: "v17"},
    ];
const sport: Option [] = [
        {label: "<5.6", value: "5.6"},
        {label: "5.7", value: "5.7"},
        {label: "5.8", value: "5.8"},
        {label: "5.9", value: "5.9"},
        {label: "5.10a", value: "5.10a"},
        {label: "5.10b", value: "5.10b"},
        {label: "5.10c", value: "5.10c"},
        {label: "5.10d", value: "5.10d"},
        {label: "5.11a", value: "5.11a"},
        {label: "5.11b", value: "5.11b"},
        {label: "5.11c", value: "5.11c"},
        {label: "5.11d", value: "5.11d"},
        {label: "5.12a", value: "5.12a"},
        {label: "5.12b", value: "5.12b"},
        {label: "5.12c", value: "5.12c"},
        {label: "5.12d", value: "5.12d"},
        {label: "5.13a", value: "5.13a"},
        {label: "5.13b", value: "5.13b"},
        {label: "5.13c", value: "5.13c"},
        {label: "5.13d", value: "5.13d"},
        {label: "5.14a", value: "5.14a"},
        {label: "5.14b", value: "5.14b"},
        {label: "5.14c", value: "5.14c"},
        {label: "5.14d", value: "5.14d"},
        {label: "5.15a", value: "5.15a"},
        {label: "5.15b", value: "5.15b"},
        {label: "5.15c", value: "5.15c"},
        {label: "5.15d", value: "5.15d"},
    ]

const font: Option[] = [
        {label: "<4", value: "4"},
        {label: "5a", value: "5a"},
        {label: "5b", value: "5b"},
        {label: "5c", value: "5c"},
        {label: "6a", value: "6a"},
        {label: "6a+", value: "6a+"},
        {label: "6b", value: "6b"},
        {label: "6b+", value: "6b+"},
        {label: "6c", value: "6c"},
        {label: "6c+", value: "6c+"},
        {label: "7a", value: "7a"},
        {label: "7a+", value: "7a+"},
        {label: "7b", value: "7b"},
        {label: "7b+", value: "7b+"},
        {label: "7c", value: "7c"},
        {label: "7c+", value: "7c+"},
        {label: "8a", value: "8a"},
        {label: "8a+", value: "8a+"},
        {label: "8b", value: "8b"},
        {label: "8b+", value: "8b+"},
        {label: "8c", value: "8c"},
        {label: "8c+", value: "8c+"},
        {label: "9a", value: "9a"},
        {label: "9a+", value: "9a+"},
        {label: "9b", value: "9b"},
        {label: "9b+", value: "9b+"},
        {label: "9c", value: "9c"},
    ]

export const climbingGrades = {
    bouldering,
    sport,
    font,
}

export const yearsExpOptions: Option[] = [
    {label: "Less than 6 months", value: "0.5"},
    {label: "1 year", value: "1"},
    {label: "2 years", value: "2"},
    {label: "3 years", value: "3"},
    {label: "4 years", value: "4"},
    {label: "5 years", value: "5"},
    {label: "6 years", value: "6"},
    {label: "7 years", value: "7"},
    {label: "8 years", value: "8"},
    {label: "9 years", value: "9"},
    {label: "10+ years", value: "10+"},
    {label: "15+ years", value: "15+"},
    {label: "20+ years", value: "20+"},
    {label: "30+ years", value: "30+"},
]

export const weightRangeOptions: Option[] = [
    {label: "<100lbs", value: "<100lbs"},
    {label: "101-120lbs", value: "101-120lbs"},
    {label: "121-140lbs", value: "121-140lbs"},
    {label: "141-160lbs", value: "141-160lbs"},
    {label: "161-180lbs", value: "161-180lbs"},
    {label: "181-200lbs", value: "181-200lbs"},
    {label: "201-220lbs", value: "201-220lbs"},
    {label: "220lbs+", value: "220lbs+"}
]

export const climbingStyles: Option[] = [
    {label: "Sport Climbing", value: "sport"},
    {label: "Bouldering", value: "bouldering"},
    {label: "Trad CLimbing", value: "trad"},
    {label: "Top Rop" , value: "top rope"}
]