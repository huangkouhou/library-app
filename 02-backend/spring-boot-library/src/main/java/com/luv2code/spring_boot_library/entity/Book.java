//这段代码是一个 JPA 实体（Entity），把 Java 类 Book 映射到数据库里的 book 表，
//Hibernate/JPA 会用它把表里的每一行变成一个 Book 对象、或把对象保存为一行。
package com.luv2code.spring_boot_library.entity;

//用 Lombok 的 @Data 自动生成 getter/setter、equals、hashCode、toString。
import lombok.Data;  
//引入 JPA 注解（@Entity、@Id 等）。
import jakarta.persistence.*;

@Entity //JPA/Hibernate：这是一个要持久化的实体类，对应数据库的一张表
@Table(name = "book") //明确表名 就是 book。
@Data //省去样板代码。注意它会用所有字段生成 equals/hashCode 和 toString
public class Book {

    @Id //主键。
    @GeneratedValue(strategy =  GenerationType.IDENTITY)//使用数据库的 自增（MySQL 的 AUTO_INCREMENT）来生成主键。
    
    @Column(name = "id")
    private Long id;

    @Column(name = "title")
    private String title;

    @Column(name = "author")
    private String author;

    @Column(name = "description")
    private String description;

    @Column(name = "copies")
    private int copies;

    @Column(name = "copies_available")
    private int copies_available; 

    @Column(name = "category")
    private String category;

    @Column(name = "img")
    private String img;

}
