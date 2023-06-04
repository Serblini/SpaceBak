const { Basket, Device } = require("../models/models");
const ApiError = require("../error/ApiError");

class ChoiseController {
  async getAll(req, res) {
    try {
      let choisesDevices = await Basket.findAll({
        attributes: [],
        where: { userId: req.user.id },
        include: [
          {
            model: Device,
            as: "device",
            required: true,
          },
        ],
      });
      choisesDevices = choisesDevices.map((device) => device.device);
      return res.json(choisesDevices);
    } catch (e) {
      console.log(`error: ${e.message}`);
    }
  }

  async createOne(req, res, next) {
    try {
      const { deviceId } = req.body;

      const findDevice = await Device.findOne({ where: { id: deviceId } });
      if (!findDevice) {
        return next(
          ApiError.badRequest("Товара, с текущим id, не существует!")
        );
      }

      const choiseDevice = await Basket.create({
        userId: req.user.id,
        deviceId,
      });
      return res.json(choiseDevice);
    } catch (error) {
      console.log(`error: ${error.message}`);
    }
  }

  async deleteOne(req, res, next) {
    const { deviceId } = req.body;
    console.log(`deviceId: ${deviceId}`);
    const choiseDevice = await Basket.findOne({
      where: {
        userId: req.user.id,
        deviceId,
      },
    });
    if (!choiseDevice) {
      return next(
        ApiError.badRequest("На этом аккаунте нет товара с этим id!")
      );
    }

    const deleteBasket = await Basket.destroy({
      where: {
        userId: req.user.id,
        deviceId,
      },
    });

    return res.json(deleteBasket);
  }
}

module.exports = new ChoiseController();
