package com.common.result;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

/**
 * @author guolw
 *
 * @param <T>
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PageDto<T> {

	private List<T> data;

	/**
	 * 总数类型有Integer和Long，接口的拓展性，使用Object作为接受对象
	 */
	private Object total;
}
