var Models = require('./models');

// 创建一个models实例
var models = new Models({
  adapter: 'disk',     // 选择的存储引擎，可选disk, mysql, mongo, memory, redis
  filePath: './data/'  // 相应的配置
});

// 注册模型pet
models.register({
  identity: 'pet',
  attributes: {
    name: 'string',
    type: 'string',
    user: {
      model: 'user'
    }
  }
});

// 注册模型user
models.register({
  identity: 'user',
  attributes: {
    first_name: 'string',
    last_name: 'string',
    pet: {
      model: 'pet'
    }
  }
});

// 初始化所以模型
models.initialize(function (err) {
  if(err) throw err;

  // 添加user记录
  models.get('user').create({
    first_name: '三',
    last_name: '张'
  }, function (err, user) {
    if (err) throw err;

    console.log(user);

    // 添加pet记录
    models.get('pet').create({
      name: '叮当猫',
      type: 'cat',
      user: user.id
    }, function (err, pet) {
      if (err) throw err;

      console.log(pet);

      // 更新user.pet
      models.get('user').update({id: user.id}, {pet: pet.id}, function (err, user) {
        if (err) throw err;

        console.log(pet);

        // 查询所有user
        models.get('user').find().populate('pet').exec(function (err, list) {
          if (err) throw err;

          console.log(list);
        });
      });
    });
  });
});
