import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema, rules } from '@ioc:Adonis/Core/Validator'
import Course from 'App/Models/Course'

export default class CoursesController {
    public async create({ request, response }: HttpContextContract) {
        const courseSchema = schema.create({
            name: schema.string(
                { trim: true }, 
                [rules.unique({ table: 'courses', column: 'name', caseInsensitive: true })]
            ),
            description: schema.string({escape: true}),
            category_id: schema.number([
                rules.exists({ table: 'categories', column: 'id' })
              ]),
        })

        const data = await request.validate({schema: courseSchema})

        try {
            await Course.create(data)
            return response.created()
          } catch {
            return response.status(400)
        }
    }

    public async delete({ request, response }: HttpContextContract) {
        const course_id = request.param('course_id');

        try {
            const category = await Course.findOrFail(course_id)
            await category.delete() 
            return response.status(200)
          } catch {
            return response.status(400)
        }

    }
}
