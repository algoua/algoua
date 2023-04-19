module.exports = {
  algorithms: [
    {
      type: 'doc',
      id: 'index',
    },
    {
      type: 'category',
      label: 'Алгебра',
      items: [
        {
          type: 'category',
          label: 'Основи',
          collapsed: false,
          items: [
            'algorithms/algebra/binary_pow',
            'algorithms/algebra/euler_function',
            'algorithms/algebra/euclid_algorithm',
            'algorithms/algebra/extended_euclid_algorithm',
          ],
        },
        {
          type: 'category',
          label: 'Комбінаторика',
          collapsed: false,
          items: [
            'algorithms/algebra/binomial_coefficients',
          ],
        },
      ],
    },
    {
      type: 'category',
      label: 'Геометрія',
      items: [
        'algorithms/geometry/length_of_segments_union',
      ],
    },
    {
      type: 'category',
      label: 'Графи',
      items: [
        {
          type: 'category',
          label: 'Обходи',
          collapsed: false,
          items: [
            'algorithms/graphs/dfs',
            'algorithms/graphs/bfs',
          ],
        },
        {
          type: 'category',
          label: 'Зв\'язність',
          collapsed: false,
          items: [
            'algorithms/graphs/connected_components',
          ],
        },
        {
          type: 'category',
          label: 'Мінімальнe каркасне дерево',
          collapsed: false,
          items: [
            'algorithms/graphs/mst_kruskal',
          ],
        },
        {
          type: 'category',
          label: 'Інше',
          collapsed: false,
          items: [
            'algorithms/graphs/topological_sort',
          ],
        },
      ],
    },
  ],
};
