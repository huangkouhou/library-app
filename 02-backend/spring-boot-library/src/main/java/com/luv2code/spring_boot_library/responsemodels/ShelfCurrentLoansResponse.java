package com.luv2code.spring_boot_library.responsemodels;

import com.luv2code.spring_boot_library.entity.Book;

import lombok.Data;

@Data
public class ShelfCurrentLoansResponse {

    public ShelfCurrentLoansResponse(Book book, int daysLeft){
        this.book = book;
        this.daysLeft = daysLeft;
    }

    private Book book;
    
    private int daysLeft;
}


// requestmodels 放“客户端→后端”的输入模型（DTO），描述请求体/表单要传什么；
// responsemodels 放“后端→客户端”的输出模型（DTO），描述接口返回要长什么样。两者职责不同、字段往往不对称，避免把 JPA 实体直接暴露给前端。

// RequestModel：我要什么（客户端给后端），带校验，不含服务器决定的字段。
// ResponseModel：我给什么（后端给客户端），只给必要、安全可用、对前端友好。