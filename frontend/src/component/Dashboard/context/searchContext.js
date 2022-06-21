import react,{useState , createContext} from "react"


// {
//     onCourseSearch : () => {},
//     onChildSubjectSearch : () => {},
//     onDateChange : () => {},
//     onSelfPasedChange : () => {}
// }


const SearchContext = createContext(
);

export const SearchContextProvider = (props) => {
    const [course, stCourse] = useState('');
    const [childsub, stChildsub] = useState('');
    const [date, stDate] = useState('');
    const [self, stSelf] = useState(false);
    // stCourse(course)

    // console.log(course);
    // console.log(childsub);
    // console.log(date);

  return (
    <SearchContext.Provider value={{
        course,
        stCourse,
        childsub,
        stChildsub,
        date,
        stDate,
        self,
        stSelf
    }}>
      {props.children}
    </SearchContext.Provider>
  );
};

export default SearchContext;