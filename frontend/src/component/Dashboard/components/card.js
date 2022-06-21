import '../static/css/card.css';
// import React , {useEffect,useState} from 'react';
// import axios from 'axios';

const Card = ({courseId,courseName,pSubject,date,cSubject,Provider,College}) => {

    
    
    return (
        <div className="card-body">
            <div className="row">
                <div className="col-lg-6 head headid"><div className="id">{courseId}</div></div>
                <div className="col-lg-6 date">{date}</div>
            </div>
            <div className="row subhead">
                <div className="col-lg-12 head">Provider</div>
                <div className="col-lg-12">{Provider}</div>
            </div>
            <div className="row subhead">
                <div className="col-lg-12 head">Course name</div>
                <div className="col-lg-12 coursename">{courseName}</div>
            </div>
            <div className="row subhead">
                <div className="col-lg-12 head">universities/institution</div>
                <div className="col-lg-12">{College}</div>
            </div>
            <div className="row subhead">
                <div className="col-lg-6 ">
                    <div className="row">
                        <div className="col-lg-12 head">parent subject</div>
                        <div className="col-lg-12 subject">{pSubject}</div>
                    </div>
                </div>
                <div className="col-lg-6 date">
                    <div className="row">
                        <div className="col-lg-12 head">child subject</div>
                        <div className="col-lg-12 subject">{cSubject}</div>
                    </div>
                </div>
            </div>
        </div>
    );
}




// <div className='container'>
//           <div className='Cards'>
//                 <div className="card Card">
//                     <div className="card-body">
//                         <div className="row">
//                             <div className="col-lg-6 headid head"><div className="id">505</div></div>
//                             <div className="col-lg-6 date">DATE</div>
//                         </div>
//                         <div className="row subhead">
//                             <div className="col-lg-12 head">Provider</div>
//                             <div className="col-lg-12">Udacity</div>
//                         </div>
//                         <div className="row subhead">
//                             <div className="col-lg-12 head">Course name</div>
//                             <div className="col-lg-12 coursename">Introduction to Artificial Intelligence</div>
//                         </div>
//                         <div className="row subhead">
//                             <div className="col-lg-12 head">universities/institution</div>
//                             <div className="col-lg-12">Stanford University</div>
//                         </div>
//                         <div className="row subhead">
//                             <div className="col-lg-6 ">
//                                 <div className="row">
//                                     <div className="col-lg-12 head">parent subject</div>
//                                     <div className="col-lg-12 subject">Computer Science</div>
//                                 </div>
//                             </div>
//                             <div className="col-lg-6 date">
//                                 <div className="row">
//                                     <div className="col-lg-12 head">child subject</div>
//                                     <div className="col-lg-12 subject">Artificial intelligence</div>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//                 <div className="card Card">
//                     <div className="card-body">
//                         <div className="row">
//                             <div className="col-lg-6 headid head"><div className="id">505</div></div>
//                             <div className="col-lg-6 date">DATE</div>
//                         </div>
//                         <div className="row subhead">
//                             <div className="col-lg-12 head">Provider</div>
//                             <div className="col-lg-12">Udacity</div>
//                         </div>
//                         <div className="row subhead">
//                             <div className="col-lg-12 head">Course name</div>
//                             <div className="col-lg-12 coursename">Introduction to Artificial Intelligence</div>
//                         </div>
//                         <div className="row subhead">
//                             <div className="col-lg-12 head">universities/institution</div>
//                             <div className="col-lg-12">Stanford University</div>
//                         </div>
//                         <div className="row subhead">
//                             <div className="col-lg-6 ">
//                                 <div className="row">
//                                     <div className="col-lg-12 head">parent subject</div>
//                                     <div className="col-lg-12 subject">Computer Science</div>
//                                 </div>
//                             </div>
//                             <div className="col-lg-6 date">
//                                 <div className="row">
//                                     <div className="col-lg-12 head">child subject</div>
//                                     <div className="col-lg-12 subject">Artificial intelligence</div>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//                 <div className="card Card">
//                     <div className="card-body">
//                         <div className="row">
//                             <div className="col-lg-6 headid head"><div className="id">505</div></div>
//                             <div className="col-lg-6 date">DATE</div>
//                         </div>
//                         <div className="row subhead">
//                             <div className="col-lg-12 head">Provider</div>
//                             <div className="col-lg-12">Udacity</div>
//                         </div>
//                         <div className="row subhead">
//                             <div className="col-lg-12 head">Course name</div>
//                             <div className="col-lg-12 coursename">Introduction to Artificial Intelligence</div>
//                         </div>
//                         <div className="row subhead">
//                             <div className="col-lg-12 head">universities/institution</div>
//                             <div className="col-lg-12">Stanford University</div>
//                         </div>
//                         <div className="row subhead">
//                             <div className="col-lg-6 ">
//                                 <div className="row">
//                                     <div className="col-lg-12 head">parent subject</div>
//                                     <div className="col-lg-12 subject">Computer Science</div>
//                                 </div>
//                             </div>
//                             <div className="col-lg-6 date">
//                                 <div className="row">
//                                     <div className="col-lg-12 head">child subject</div>
//                                     <div className="col-lg-12 subject">Artificial intelligence</div>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//           </div>
//         </div>  








// <div className="card Card">
//                     <div className="card-body">
//                         <div className="row">
//                             <div className="col-lg-6 head headid"><div className="id">{data[0]['Course Id']}</div></div>
//                             <div className="col-lg-6 date">{data[0]['Next Session Date']}</div>
//                         </div>
//                         <div className="row subhead">
//                             <div className="col-lg-12 head">Provider</div>
//                             <div className="col-lg-12">{data[0]['Provider']}</div>
//                         </div>
//                         <div className="row subhead">
//                             <div className="col-lg-12 head">Course name</div>
//                             <div className="col-lg-12 coursename">{data[0]['Course Name']}</div>
//                         </div>
//                         <div className="row subhead">
//                             <div className="col-lg-12 head">universities/institution</div>
//                             <div className="col-lg-12">{data[0]['Universities/Institutions']}</div>
//                         </div>
//                         <div className="row subhead">
//                             <div className="col-lg-6 ">
//                                 <div className="row">
//                                     <div className="col-lg-12 head">parent subject</div>
//                                     <div className="col-lg-12 subject">{data[0]['Parent Subject']}</div>
//                                 </div>
//                             </div>
//                             <div className="col-lg-6 date">
//                                 <div className="row">
//                                     <div className="col-lg-12 head">child subject</div>
//                                     <div className="col-lg-12 subject">{data[0]['Child Subject']}</div>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>






// <div className="Cards">
//                 <div className="card Card">
//                     <div className="card-body">
//                         <div className="row">
//                             <div className="col-lg-6 headid head"><div className="id">505</div></div>
//                             <div className="col-lg-6 date">DATE</div>
//                         </div>
//                         <div className="row subhead">
//                             <div className="col-lg-12 head">Provider</div>
//                             <div className="col-lg-12">Udacity</div>
//                         </div>
//                         <div className="row subhead">
//                             <div className="col-lg-12 head">Course name</div>
//                             <div className="col-lg-12 coursename">Introduction to Artificial Intelligence</div>
//                         </div>
//                         <div className="row subhead">
//                             <div className="col-lg-12 head">universities/institution</div>
//                             <div className="col-lg-12">Stanford University</div>
//                         </div>
//                         <div className="row subhead">
//                             <div className="col-lg-6 ">
//                                 <div className="row">
//                                     <div className="col-lg-12 head">parent subject</div>
//                                     <div className="col-lg-12 subject">Computer Science</div>
//                                 </div>
//                             </div>
//                             <div className="col-lg-6 date">
//                                 <div className="row">
//                                     <div className="col-lg-12 head">child subject</div>
//                                     <div className="col-lg-12 subject">Artificial intelligence</div>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>

export default Card;