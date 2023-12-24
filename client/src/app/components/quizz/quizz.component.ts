import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import quizz_questions from '../../../assets/data/quizz_questions.json'

@Component({
  selector: 'app-quizz',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './quizz.component.html',
  styleUrl: './quizz.component.css'
})
export class QuizzComponent implements OnInit{
  title: string = ""
  questions: any
  selectedQuestion: any
  questionIndex: number = 0
  questionMaxIndex: number = 0
  answers: string[] = []
  selectedAnswer: string = ""
  isFinished: boolean = false

  ngOnInit(): void {
    if (quizz_questions){
      this.isFinished = false
      this.title = quizz_questions.title
      this.questions = quizz_questions.questions
      this.selectedQuestion = this.questions[this.questionIndex]
      this.questionIndex = 0
      this.questionMaxIndex = this.questions.length
    }
  }

  playerChoose(value:string){
    this.answers.push(value)
    this.nextQuestion()
  }

  async nextQuestion(){
    this.questionIndex += 1

    if(this.questionMaxIndex > this.questionIndex){
      this.selectedQuestion = this.questions[this.questionIndex]
    }else{
      const finalAnswer:string = await this.checkResult(this.answers)
      this.isFinished = true
      this.selectedAnswer = quizz_questions.results[
        finalAnswer as keyof typeof quizz_questions.results]
    }
  }
  async checkResult(answers:string[]){
    const result = answers.reduce((previous, current, i, arr) => {
      if(
        arr.filter(item => item === previous).length >
        arr.filter(item => item === current).length
      ){
        return previous
      }else{
        return current
      }
    })
    return result
  }
}
