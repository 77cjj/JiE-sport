<template>
  <div class="registration-form-page">
    <el-page-header
      class="page-header"
      :content="pageTitle"
      @back="$router.back()"
    />

    <el-card class="form-card" shadow="hover">
      <template #header>
        <div class="card-header">
          <span>报名信息</span>
        </div>
      </template>

      <el-form
        ref="formRef"
        :model="form"
        :rules="rules"
        label-width="96px"
        status-icon
      >
        <el-row :gutter="16">
          <el-col :xs="24" :md="12">
            <el-form-item label="姓名" prop="name">
              <el-input
                v-model="form.name"
                placeholder="请输入姓名"
                clearable
              />
            </el-form-item>
          </el-col>
          <el-col :xs="24" :md="12">
            <el-form-item label="学号" prop="studentId">
              <el-input
                v-model="form.studentId"
                placeholder="请输入学号"
                clearable
              />
            </el-form-item>
          </el-col>

          <el-col :xs="24" :md="12">
            <el-form-item label="性别" prop="gender">
              <el-segmented v-model="form.gender" :options="genderOptions" />
            </el-form-item>
          </el-col>

          <el-col :xs="24" :md="12">
            <el-form-item label="院系" prop="department">
              <el-select
                v-model="form.department"
                placeholder="请选择院系"
                filterable
                clearable
              >
                <el-option
                  v-for="d in departments"
                  :key="d"
                  :label="d"
                  :value="d"
                />
              </el-select>
            </el-form-item>
          </el-col>

          <el-col :xs="24" :md="12">
            <el-form-item label="联系电话" prop="phone">
              <el-input
                v-model="form.phone"
                maxlength="11"
                placeholder="请输入手机号码"
                clearable
              />
            </el-form-item>
          </el-col>

          <el-col :xs="24" :md="12">
            <el-form-item label="邮箱" prop="email">
              <el-input
                v-model="form.email"
                placeholder="可选，便于通知"
                clearable
              />
            </el-form-item>
          </el-col>

          <el-col :xs="24">
            <el-form-item label="报名项目" prop="events">
              <el-select
                v-model="form.events"
                multiple
                collapse-tags
                :max-collapse-tags="3"
                placeholder="请选择报名项目"
                filterable
              >
                <el-option-group
                  v-for="group in eventGroups"
                  :key="group.label"
                  :label="group.label"
                >
                  <el-option
                    v-for="item in group.options"
                    :key="item"
                    :label="item"
                    :value="item"
                  />
                </el-option-group>
              </el-select>
            </el-form-item>
          </el-col>

          <el-col :xs="24">
            <el-form-item label="备注">
              <el-input
                v-model="form.remark"
                type="textarea"
                :rows="3"
                :placeholder="remarkPlaceholder"
              />
            </el-form-item>
          </el-col>

          <el-col :xs="24">
            <el-form-item prop="agree">
              <el-checkbox v-model="form.agree"
                >我已阅读并同意《竞赛报名须知》</el-checkbox
              >
            </el-form-item>
          </el-col>
        </el-row>

        <div class="form-actions">
          <el-space>
            <el-button
              type="primary"
              :loading="submitting"
              @click="handleSubmit"
              >提交报名</el-button
            >
            <el-button @click="handleReset">重置</el-button>
          </el-space>
        </div>
      </el-form>
    </el-card>
  </div>
</template>

<script setup>
import { ref, reactive, computed, watch } from "vue";
import { useRoute } from "vue-router";
import { ElMessage, ElMessageBox } from "element-plus";
import { useEventsStore } from "@/stores/eventsStore";
import { useUserStore } from "@/stores/userStore";
import eventFormConfigs, {
  DEFAULT_FORM_KEY,
} from "../data/eventFormConfigs.js";

const route = useRoute();
const eventsStore = useEventsStore();
const userStore = useUserStore();
const formRef = ref();
const submitting = ref(false);

const form = reactive({
  name: "",
  studentId: "",
  gender: "男",
  department: "",
  phone: "",
  email: "",
  events: [],
  remark: "",
  agree: false,
});

const genderOptions = ["男", "女"];

const departments = [
  "计算机学院",
  "电子信息学院",
  "机械工程学院",
  "外国语学院",
  "经济管理学院",
  "艺术设计学院",
];

const formKey = computed(() => {
  const key = route.query.event;
  if (typeof key === "string" && eventFormConfigs[key]) return key;
  return DEFAULT_FORM_KEY;
});

const currentConfig = computed(
  () => eventFormConfigs[formKey.value] || eventFormConfigs[DEFAULT_FORM_KEY]
);

const pageTitle = computed(() => currentConfig.value.title);

const eventGroups = computed(
  () => currentConfig.value.eventGroups || eventFormConfigs[DEFAULT_FORM_KEY].eventGroups
);

const noticeContent = computed(
  () => currentConfig.value.notice || eventFormConfigs[DEFAULT_FORM_KEY].notice
);

const remarkPlaceholder = computed(
  () => currentConfig.value.remarkPlaceholder || "如有特殊需求请在此说明"
);

watch(
  () => formKey.value,
  () => {
    form.events = [];
    form.remark = "";
  },
  { immediate: true }
);

const prefillForm = () => {
  const info = userStore.userInfo || {};
  if (info.name) form.name = info.name;
  if (info.studentId) form.studentId = info.studentId;
  if (info.department) form.department = info.department;
  if (info.phone) form.phone = info.phone;
  if (info.email) form.email = info.email;
};

watch(
  () => userStore.userInfo,
  () => prefillForm(),
  { immediate: true, deep: true }
);

const rules = {
  name: [
    { required: true, message: "请输入姓名", trigger: "blur" },
    { min: 2, message: "姓名至少为2个字符", trigger: "blur" },
  ],
  studentId: [{ required: true, message: "请输入学号", trigger: "blur" }],
  gender: [{ required: true, message: "请选择性别", trigger: "change" }],
  department: [{ required: true, message: "请选择院系", trigger: "change" }],
  phone: [
    { required: true, message: "请输入联系电话", trigger: "blur" },
    {
      validator: (_r, v, cb) => {
        if (!/^\d{11}$/.test(v)) cb(new Error("请输入11位手机号码"));
        else cb();
      },
      trigger: "blur",
    },
  ],
  email: [
    {
      validator: (_r, v, cb) => {
        if (!v) return cb();
        if (!/^[\w.+-]+@([\w-]+\.)+[\w-]{2,}$/.test(v))
          cb(new Error("邮箱格式不正确"));
        else cb();
      },
      trigger: "blur",
    },
  ],
  events: [{ required: true, message: "请选择报名项目", trigger: "change" }],
  agree: [
    {
      validator: (_r, v, cb) => {
        if (!v) cb(new Error("请先阅读并同意须知"));
        else cb();
      },
      trigger: "change",
    },
  ],
};

const openRules = () => {
  ElMessageBox.alert(noticeContent.value, "竞赛报名须知", {
    confirmButtonText: "我知道了",
  });
};

const handleReset = () => {
  formRef.value?.resetFields();
};

const payload = computed(() => ({
  ...form,
  eventKey: formKey.value,
  eventTitle: pageTitle.value,
}));
const mockSubmitApi = (data) =>
  new Promise((resolve) => setTimeout(() => resolve({ ok: true, data }), 1200));

const handleSubmit = () => {
  formRef.value?.validate(async (valid) => {
    if (!valid) return;
    try {
      submitting.value = true;
      const res = await mockSubmitApi(payload.value);
      if (res?.ok) {
        const meta = currentConfig.value.meta || {};
        await eventsStore.addUpcomingEvent({
          id: meta.id || `form-${formKey.value}-${Date.now()}`,
          title: meta.title || pageTitle.value,
          date: meta.date || "时间待通知",
          location: meta.location || "地点待通知",
        });
        userStore.incrementRegistered?.();
        ElMessage.success("报名成功，请留意通知！");
        handleReset();
      }
    } finally {
      submitting.value = false;
    }
  });
};
</script>

<style scoped>
.registration-form-page {
  padding: 16px 20px 32px;
}
.page-header {
  margin-bottom: 12px;
}
.form-card {
  max-width: 980px;
  margin: 0 auto;
}
.card-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.form-actions {
  margin-top: 4px;
  display: flex;
  justify-content: flex-end;
}
</style> 