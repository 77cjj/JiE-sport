<template>
  <div class="login-page">
    <el-card class="login-card">
      <h2 class="title">登录页面</h2>
      <p class="subtitle">请输入账号密码进行登录</p>

      <el-form :model="form" :rules="rules" ref="formRef" label-position="top">
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

        <el-form-item>
          <el-button type="primary" class="login-btn" @click="submitForm">
            登录
          </el-button>
        </el-form-item>
      </el-form>

      <div class="register-link">
        还没有账户？
        <router-link to="/register">点此注册</router-link>
      </div>
    </el-card>
  </div>
</template>

<script setup>
import { reactive, ref } from "vue";

const formRef = ref();
const form = reactive({
  email: "",
  password: "",
});

const rules = {
  email: [
    { required: true, message: "请输入邮箱", trigger: "blur" },
    { type: "email", message: "邮箱格式不正确", trigger: "blur" },
  ],
  password: [{ required: true, message: "请输入密码", trigger: "blur" }],
};

const submitForm = () => {
  formRef.value.validate((valid) => {
    if (valid) {
      console.log("登录成功", form);
      // 这里可以调用后端 API 验证账号密码
    } else {
      console.log("表单验证失败");
    }
  });
};
</script>

<style scoped>
.login-page {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: #f5f7fa;
}

.login-card {
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

.login-btn {
  width: 100%;
}

.register-link {
  margin-top: 15px;
  font-size: 14px;
}
.register-link a {
  color: #409eff;
  text-decoration: none;
}
</style>
