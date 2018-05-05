# Dump of table User
# ------------------------------------------------------------
DROP TABLE IF EXISTS `User`;
CREATE TABLE `User` (
  `id` INT NOT NULL AUTO_INCREMENT COMMENT '用户唯一id',
  `name` VARCHAR(64) NOT NULL DEFAULT '' COMMENT '用户名称',
  `head` VARCHAR(256) NOT NULL DEFAULT '' COMMENT '用户头像url',
  `phone` VARCHAR(11) NOT NULL DEFAULT '' COMMENT '手机号码',
  `password` VARCHAR(60) DEFAULT NULL COMMENT '用户密码',
  `logintime` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '登陆时间',
  `createtime` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `updatetime` DATETIME(6) NOT NULL DEFAULT NOW(6) ON UPDATE NOW(6) COMMENT '更新时间',
  PRIMARY KEY (`userid`),
  UNIQUE KEY `UNIQUE_PHONE` (`region`,`phone`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='用户表';

DROP TABLE IF EXISTS `ThirdPartUser`;
CREATE TABLE `ThirdPartUser` (
  `userid` INT NOT NULL COMMENT '用户唯一id',
  `method` INT NOT NULL COMMENT '第三方登录类型',
  `openid` VARCHAR(128) NOT NULL COMMENT '第三方用户id',
  UNIQUE KEY `UNIQUE_BINDING` (`method`,`openid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='第三方用户关联表';

# Dump of table Currency
# ------------------------------------------------------------
DROP TABLE IF EXISTS `Currency`;
CREATE TABLE `Currency` (
  `userid` INT NOT NULL COMMENT '用户唯一id',
  `type` INT NOT NULL COMMENT '货币类型',
  `value` BIGINT NOT NULL COMMENT '货币值',
  UNIQUE KEY `UNIQUE_BINDING` (`userid`,`type`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='货币表';

# Dump of table Validation
# ------------------------------------------------------------
DROP TABLE IF EXISTS `Validation`;
CREATE TABLE `Validation` (
  `phone` VARCHAR(11) NOT NULL DEFAULT '' COMMENT '手机号码',
  `type` INT NOT NULL COMMENT '验证类型',
  `value` VARCHAR(10) NOT NULL DEFAULT '' COMMENT '验证码',
  `createTime` bigint(20) unsigned DEFAULT '0' COMMENT '生成时间',
  UNIQUE KEY `UNIQUE_BINDING` (`phone`,`type`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='验证码表';

