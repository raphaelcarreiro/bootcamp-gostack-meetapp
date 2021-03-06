import { isBefore, startOfHour, endOfHour } from 'date-fns';
import { Op } from 'sequelize';
import Subscription from '../models/Subscription';
import Meetup from '../models/Meetup';
import File from '../models/File';
import User from '../models/User';

class SubscriptionController {
  async index(req, res) {
    const meetUps = await Meetup.findAll({
      where: {
        date: {
          [Op.gt]: new Date(),
        },
      },
      attributes: [
        'id',
        'title',
        'description',
        'location',
        'date',
        'user_id',
        'file_id',
      ],
      include: [
        {
          model: Subscription,
          as: 'subscription',
          where: {
            user_id: req.userId,
          },
          attributes: ['created_at', 'user_id'],
        },
        {
          model: File,
          as: 'file',
          attributes: ['id', 'url', 'path'],
        },
        {
          model: User,
          as: 'user',
          attributes: ['id', 'name'],
        },
      ],
      order: ['date'],
    });

    return res.json(meetUps);
  }

  async store(req, res) {
    const meetUp = await Meetup.findByPk(req.params.meetUpId);

    if (!meetUp) {
      return res.status(404).json({ error: 'MeetUp not found' });
    }

    if (meetUp.userId === req.userId) {
      return res
        .status(401)
        .json({ error: 'It not possible to subscribe in your own meetUp' });
    }

    if (isBefore(meetUp.date, new Date())) {
      return res
        .status(401)
        .json({ error: 'It not possible to subscribe in a past meetUp' });
    }

    let subscription = await Subscription.findOne({
      where: {
        meetup_id: req.params.meetUpId,
        user_id: req.userId,
      },
    });

    if (subscription) {
      return res
        .status(401)
        .json({ error: 'It not possible to subscribe twice in a meetUp' });
    }

    subscription = await Subscription.findOne({
      where: {
        user_id: req.userId,
      },
      include: [
        {
          model: Meetup,
          as: 'meetup',
          where: {
            date: {
              [Op.between]: [startOfHour(meetUp.date), endOfHour(meetUp.date)],
            },
          },
        },
      ],
    });

    if (subscription) {
      return res.status(401).json({
        error:
          'It not possible to subscribe in a meetUp that take places in the same hour',
      });
    }

    const { id } = await Subscription.create({
      meetup_id: meetUp.id,
      user_id: req.userId,
    });

    return res.json({ id });
  }

  async destroy(req, res) {
    const meetUp = await Subscription.findOne({
      where: {
        user_id: req.userId,
        meetup_id: req.params.meetUpId,
      },
    });

    if (!meetUp) {
      return res.status(401).json({ error: 'Meetup not found' });
    }

    await meetUp.destroy();

    const { id, title, description, location, user_id, user, file_id } = meetUp;

    return res.json({
      id,
      title,
      description,
      location,
      user_id,
      user,
      file_id,
    });
  }
}

export default new SubscriptionController();
