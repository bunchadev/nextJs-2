export {};
declare global{
     interface IProduct {
          "id": string;
          "productName": string;
          "description": string;
          "nameTitle":string;
          "author": string;
          "numberStudents": number;
          "evaluate": number;
          "price": number;
          "type": string;
          "fileName": string;
          "createdAt": string;
          "updatedAt": string;
     }

     interface ILessonContent {
          "title": string[];
     }

     interface IVideo {
          "title": string;
          "descriptionVideoDtos": IDescriptionVideo[];
     }

     interface IDescriptionVideo {
          "titleVideo": string;
          "timeVideo": string;
     }
     interface IShareCourse extends IProduct{
          isCourse: boolean;
     }
     interface IPayment {
          pay:IProduct | null;
          cart:IProduct[];
     }
     interface IPaymentContext {
          courses: IPayment;
          setCourses:(v: IPayment) => void
     }
     interface ICourseContext {
          currentCourse: IShareCourse;
          setCurrentCourse: (v: IShareCourse) => void;
     }
     interface IBackendRes<T> {
          statusCode?: number | string;
          data?: T;
     }
     interface IComment {
          id: string;
          productId: string,
          userName: string,
          title: string,
          evaluate: number,
          createdAt: string,
          updatedAt: string
     }
}