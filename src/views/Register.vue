<template>
  <div class="register-page">
    <el-card class="register-card">
      <!-- 标题 -->
      <h2 class="title">注册页面</h2>
      <p class="subtitle">所有收集的资料仅供报名及通知使用</p>

      <!-- 表单 -->
      <el-form :model="form" :rules="rules" ref="formRef" label-position="top">
        <el-form-item label="名字" prop="name">
          <el-input v-model="form.name" placeholder="请输入姓名" />
        </el-form-item>

        <el-form-item label="学号" prop="studentId">
          <el-input v-model="form.studentId" placeholder="例 202201111111" />
        </el-form-item>

        <el-form-item label="邮箱Email" prop="email">
          <el-input v-model="form.email" placeholder="1234567@example.com" />
        </el-form-item>

        <el-form-item label="密码" prop="password">
          <el-input
            v-model="form.password"
            placeholder="请输入密码"
            show-password
          />
        </el-form-item>

        <!-- 协议勾选 -->
        <el-form-item prop="agreement">
          <el-checkbox v-model="form.agreement">
            点击即视为同意该网站的隐私协议
          </el-checkbox>
        </el-form-item>

        <!-- 注册按钮 -->
        <el-form-item>
          <el-button type="primary" class="register-btn" @click="submitForm">
            提交注册
          </el-button>
        </el-form-item>
      </el-form>

      <!-- 登录入口 -->
      <div class="login-link">
        已经有账户了？
        <a href="/login">点此处登录</a>
      </div>
    </el-card>
  </div>
</template>

<script setup>
import { reactive, ref } from "vue";

const formRef = ref();
const form = reactive({
  name: "",
  studentId: "",
  email: "",
  password: "",
  agreement: false,
});

// 表单校验规则
const rules = {
  name: [{ required: true, message: "请输入姓名", trigger: "blur" }],
  studentId: [{ required: true, message: "请输入学号", trigger: "blur" }],
  email: [
    { required: true, message: "请输入邮箱", trigger: "blur" },
    { type: "email", message: "邮箱格式不正确", trigger: "blur" },
  ],
  password: [{ required: true, message: "请输入密码", trigger: "blur" }],
  agreement: [
    {
      type: "boolean",
      required: true,
      validator: (_, value, callback) => {
        if (!value) {
          callback(new Error("请勾选隐私协议"));
        } else {
          callback();
        }
      },
      trigger: "change",
    },
  ],
};

const submitForm = () => {
  formRef.value.validate((valid) => {
    if (valid) {
      console.log("提交成功", form);
      // 这里可以调用后端 API 提交注册
    } else {
      console.log("表单验证失败");
    }
  });
};
</script>

<style scoped>
.register-page {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: #f5f7fa;
}

.register-card {
  width: 400px;
  padding: 30px;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  text-align: center;
}

.title {
  font-size: 22px;
  font-weight: bold;
  margin-bottom: 5px;
}

.subtitle {
  font-size: 14px;
  color: #666;
  margin-bottom: 20px;
}

.register-btn {
  width: 100%;
}

.login-link {
  margin-top: 15px;
  font-size: 14px;
}
.login-link a {
  color: #409eff;
  text-decoration: none;
}
</style>
