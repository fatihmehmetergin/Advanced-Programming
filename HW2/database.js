class Student {
	constructor(id,name,gpa,courses=[]) {
    	this.id=id;
        this.name=name;
        this.gpa=gpa;
        this.courses=courses;
  	}
	toString(){
		return this.id+" "+this.name+" "+this.gpa;
	}
}
class Course {
    constructor(name,time,date,rooms=[]) {
    	this.name=name;
        this.time=time;
        this.date=date;
        this.rooms=rooms;
  	}
	toString(){
		return this.name;
	}
}
class Database{
	constructor() {
		this.courses=new Map();
        const url1="https://maeyler.github.io/JS/data/Courses.txt"
        fetch(url1)
		.then(b => b.text())
		.then(b => this.addCourse(b,this.courses));
		this.students=new Map();
        const url2="https://maeyler.github.io/JS/data/Students.txt"
		fetch(url2)
		.then(a => a.text())
		.then(a => this.addStudent(a,this.students));

	}
	addCourse(text,courses){
        let l=text.split("\n");
        for(let a of l) {
            let w=a.split("\t");
            let course = new Course(w[0],w[1],w[2],w.slice(3));
            courses.set(course.name,course);
        }
    }

    addStudent(text,students){
        let l=text.split("\n");
        for(let a of l) {
            let w=a.split("\t");
            if(w=="")
                break;
            let student = new Student(w[0],w[1],w[2],w.slice(3));
            /*var b;
            for (b=3;b<w.length;b+=2){
                var c=w[b].concat(w[b+1]);
                student.courses.push(c);
            }*/
            students.set(student.id,student);
        }
    }
}
