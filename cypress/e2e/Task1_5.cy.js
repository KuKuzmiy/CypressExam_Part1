import { faker } from '@faker-js/faker'
import { RegisterPage } from '../pages/RegisterPage'

const page = new RegisterPage()

it('fills feedback comment', () => {
  page.visitFeedback()
  page.dismissWelcomeBanner()
  page.acceptCookies()

  const comment = faker.lorem.sentence(10).slice(0, 150)

  page.typeFeedbackComment(comment)
  page.assertFeedbackCommentValue(comment)

  page.setRating(5)

  page.solveCaptchaAndTypeResult()

  page.submitFeedback()

})
