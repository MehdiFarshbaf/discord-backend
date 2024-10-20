export const postInvitation = async (req, res, next) => {

    const {targetEmailAddress} = req.body
    try {
        res.status(200).json({
            success: true,
            message: 'invite shod',
            email: targetEmailAddress
        })
    } catch (err) {
        next(err)
    }
}