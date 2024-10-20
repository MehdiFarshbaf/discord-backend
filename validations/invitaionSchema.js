import * as Yup from 'yup'

export const postInvitationSchema = Yup.object().shape({
    targetEmailAddress: Yup.string().required().email()
})