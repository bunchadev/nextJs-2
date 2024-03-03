'use client'
import { createContext, useContext, useState } from "react";
export const CourseContext = createContext<ICourseContext | IPaymentContext | null>(null);
export const CourseContextProvider = ({ children }: { children: React.ReactNode }) => {
    const initValue1 = {
        "id":"",
        "productName":"",
        "description":"",
        "author":"",
        "numberStudents":0,
        "evaluate":0,
        "price":0,
        "type":"",
        "fileName":"",
        "createdAt":"",
        "updatedAt":"",
         isCourse: false
    }
    const initValue2 = {
        pay:{
            "id":"",
            "productName":"",
            "description":"",
            "author":"",
            "numberStudents":0,
            "evaluate":0,
            "price":0,
            "type":"",
            "fileName":"",
            "createdAt":"",
            "updatedAt":"",
        },
        cart: [

        ]
    }
    const [currentCourse, setCurrentCourse] = useState<IShareCourse>(initValue1);
    const [courses,setCourses] = useState<IPayment>(initValue2)
    return (
        <CourseContext.Provider value={{ currentCourse, setCurrentCourse, courses , setCourses }}>
            {children}
        </CourseContext.Provider>
    )
};
export const useCourseContext = () => useContext(CourseContext);