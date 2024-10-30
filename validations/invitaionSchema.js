import * as Yup from 'yup'

export const postInvitationSchema = Yup.object().shape({
    targetEmailAddress: Yup.string().required().email()
})
export const acceptRejectSchema = Yup.object().shape({
    id: Yup.string().required()
})