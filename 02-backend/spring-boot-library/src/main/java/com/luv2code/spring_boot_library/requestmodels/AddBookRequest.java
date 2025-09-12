package com.luv2code.spring_boot_library.requestmodels;

import lombok.Data;

@Data
public class AddBookRequest {

    private String title;

    private String author;

    private String description;

    private int copies;

    private String category;

    private String img;

}

// 决策清单（背下来面试用）

// 写库/改库用 Entity，别让前端直接改实体字段。

// 接收请求用 Request DTO：只给前端能填的字段 + 校验注解。

// 返回响应用 Response DTO：只回前端需要的字段，可聚合多个实体。

// 统一从 JWT 拿身份信息（如 email、sub），不要从请求体读。

// 需要版本化/安全/性能/解耦 → 坚决用 DTO；仅内部原型且简单 → 可短期用实体，但要有技术债意识。
