import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateStudentInput } from './create-student.input';
import { Student } from './student.entity';
import { v4 as uuid } from 'uuid';

@Injectable()
export class StudentService {
  constructor(
    @InjectRepository(Student)
    private studentRepository: Repository<Student>,
  ) {}

  getStudent(id: string): Promise<Student> {
    return this.studentRepository.findOne({ where: { id } });
  }

  getStudents(): Promise<Student[]> {
    return this.studentRepository.find();
  }

  createStudent(createStudent: CreateStudentInput): Promise<Student> {
    const student = this.studentRepository.create({
      ...createStudent,
      id: uuid(),
    });

    return this.studentRepository.save(student);
  }

  getManyStudents(studentIds: string[]): Promise<Student[]> {
    console.log(studentIds);
    return this.studentRepository.find({
      where: {
        id: {
          $in: [...studentIds],
        } as any,
      },
    });
  }
}
